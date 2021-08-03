var app = new Vue (
  {
    el:"#app",
    data:{
      baseUrl:'https://api.themoviedb.org/3/search/',
      apiKey:'bb946051787722f6361023f25c0639b5',
      selectedLanguageIndex: 0,
      languages:[
        'it-IT',
        'en-US',
        'es-ES',
        'sv-SE',
        'hr-HR',
        'fr-FR',
        'de-DE',
        'pt-PT'
      ],
      userTitle:'',
      moviesAndSeries:[],
      myFlags:[
        'de',
        'en',
        'es',
        'fr',
        'hr',
        'it',
        'pt',
        'sv',
        'no',
        'ko',
        'ja',
        'sr',
        'zh',
        'eu',
        'fa',
        'vi',
        'tr',
        'da',
        'ms',
        'id',
        'th'
      ],
      selected:'',
      isShown: false
    },
    methods:{
      searchTitle: function(){
        if (this.userTitle != '') {
          if (this.selected == '') {
            this.moviesAndSeries = [];
            this.moviesAxios();
            this.seriesAxios();
            this.userTitle = '';
          } else if (this.selected == 'Movies') {
            this.moviesAndSeries = [];
            this.moviesAxios();
            this.userTitle = '';
          } else if (this.selected == 'Series') {
            this.moviesAndSeries = [];
            this.seriesAxios();
            this.userTitle = '';
          }
        }
      },
      deleteItem: function(index){
        this.moviesAndSeries.splice(index,1);
      },
      roundVote:function (params) {
        params.forEach((item) => {
          item.vote_average = Math.ceil(item.vote_average / 2);
        });
      },
      sortingVote:function (params) {
        params.sort((a,b) => (a.vote_average > b.vote_average) ? -1 : 1);
      },
      moviesAxios:function () {
        axios.get( this.baseUrl + 'movie',{
          params:{
            api_key:this.apiKey,
            query:this.userTitle,
            language:this.languages[this.selectedLanguageIndex]
          }
        })
        .then((response) => {
          this.moviesAndSeries.push(...response.data.results);
          this.roundVote(this.moviesAndSeries);
          this.sortingVote(this.moviesAndSeries);
        });
      },
      seriesAxios:function () {
        axios.get( this.baseUrl + 'tv',{
          params:{
            api_key:this.apiKey,
            query:this.userTitle,
            language:this.languages[this.selectedLanguageIndex]
          }
        })
        .then((response) => {
          this.moviesAndSeries.push(...response.data.results);
          this.roundVote(this.moviesAndSeries);
          this.sortingVote(this.moviesAndSeries);
        });
      }
    }
  }
)
