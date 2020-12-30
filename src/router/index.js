const routes = [{
      path: '/',
      mode: 'history',
      component: App,
      meta: {
        title: 'NYS',
        metaTags: [{
            name: 'description',
            content: 'New York State COVID 19 info'
          },
          {
            property: 'og:description',
            content: 'New York State COVID 19 info'
          }
        ]
      }
    }
  ];
