﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StackOverflow.Models;

namespace StackOverflow.IServices
{
    public interface IQuestionCommentService : IRepository<QuestionComment>
    {
        //public Task<IActionResult> GetQuestionComments(int questionId);
    }
}
