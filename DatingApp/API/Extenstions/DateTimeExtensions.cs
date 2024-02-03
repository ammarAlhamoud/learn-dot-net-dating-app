namespace API.Extensions
{
    public static class DateTimeExtensions
    {
        public static int CalculateAge(this DateOnly dob)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var age = today.Year - dob.Year;
            // if the user has not had their birthday yet this year, subtract 1 from age
            if (dob > today.AddYears(-age)) age--;
            return age;
        }
    }
}

