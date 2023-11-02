using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mis321_pa4_casherman3_new.api.models
{
    public class Exercise
    {
        public int id {get; set;}
        public string activity_type {get; set;}
        public int distance_in_miles {get; set;}
        public string date_completed {get; set;}
        public string pinned {get; set;}
        public string deleted {get; set;}

        public void ToString()
        {
            System.Console.WriteLine($"{id} {activity_type} {distance_in_miles} {date_completed} {pinned} {deleted}");
        }
    }
}