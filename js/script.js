var app = new Vue (
  {
    el:"#app",
    data:{
      userTitle:'',
      movies:[
      ]
    },
    methods:{
      searchTitle: function(){
        // static request to the server
        // axios.get('https://api.themoviedb.org/3/search/movie?api_key=bb946051787722f6361023f25c0639b5&query=ritorno+al+fut&language=it-IT')
        // .then((response) => {
        //   this.movies = response.data.results;
        // });

        // dinamic request to the server
        axios.get('https://api.themoviedb.org/3/search/movie',{
          params:{
            api_key:"bb946051787722f6361023f25c0639b5",
            query:this.userTitle,
            language:"it-IT"
          }
        })
        .then((response) => {
          // console.log(response);
          this.movies = response.data.results;
        });
        this.userTitle = '';
      }
    }
  }
)
