var app = new Vue (
  {
    el:"#app",
    data:{
      movies:[
        {
          poster_path: "https://image.tmdb.org/t/p/w300/6NfLuSGpJiwjdYC7j5AxbAcV6Qf.jpg",
          title: "Ritorno al futuro",
          original_title: "Back to the Future",
          original_language: "en",
          vote_average: 8.3,
        },
        {
          poster_path: "https://image.tmdb.org/t/p/w300//pqWQIGt8MXcaikTjy9Zm5zwdAiW.jpg",
          title: "Ritorno al futuro - Parte II",
          original_title: "Back to the Future Part II",
          original_language: "en",
          vote_average: 7.7,
        }
      ]
    }
  }
)
