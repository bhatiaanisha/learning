using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StackOverflow.Models;
using StackOverflow.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StackOverflow.Services
{
    public class TagService : Repository<Tag>, ITagService
    {
        public TagService(StackOverflowDemoContext stackOverflowDemoContext) : base(stackOverflowDemoContext)
        {

        }
    }
}
