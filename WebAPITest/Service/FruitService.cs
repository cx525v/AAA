using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPITest.Entity;
using WebAPITest.Models;

namespace WebAPITest.Service
{
    public interface IFruitService
    {
        Task<List<FruitModel>> GetFruits();
        Task<FruitModel> GetFruitByName(string name);

        Task<Media> SaveMedia(string url);
        Task<byte[]> GetImage(int id);

        Task<List<Media>> GetAllImage();
    }
    public class FruitService: IFruitService
    {
        private readonly MytestdbContext _dbContext;

        public FruitService(MytestdbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<FruitModel>> GetFruits()
        {
            var result = await _dbContext.Fruit.ToListAsync();

            return result.Select(x => new FruitModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
            }).ToList();
        }

        public async Task<FruitModel> GetFruitByName(string name)
        {
            var result = (await _dbContext.Fruit.Where(x => x.Name == name).ToListAsync()).FirstOrDefault();

            if(result == null) return null;

            return new FruitModel
            {
                Id = result.Id,
                Name = result.Name,
                Price = result.Price
            };
        }

        public async Task<Media> SaveMedia(string url)
        {
            byte[] imageAsByteArray;
            using var webClient = new WebClient();
            imageAsByteArray = webClient.DownloadData(new Uri(url));

            var media = new Media
            {
                Img = imageAsByteArray
            };

            _dbContext.Media.Add(media);

            await _dbContext.SaveChangesAsync();

            return media;
        }

        public async Task<byte[]> GetImage(int id)
        {
            var media = await _dbContext.Media.FindAsync(id);
            return media.Img;
        }

        public async Task<List<Media>> GetAllImage()
        {
            return await _dbContext.Media.ToListAsync();

        }
    }
}
