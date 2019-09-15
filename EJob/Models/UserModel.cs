using System.ComponentModel.DataAnnotations;

namespace EJob.Models
{
    public class UserModel
    {
        [Required] 
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
