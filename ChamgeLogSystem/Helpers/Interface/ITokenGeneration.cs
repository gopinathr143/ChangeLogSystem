using ChamgeLogSystem.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChamgeLogSystem.Helpers.Interface
{
    public interface ITokenGeneration
    {
        string GenerateJwtToken(User userInfo);
        RefreshToken GenerateRefreshToken(string ipAddress);
    }
}
