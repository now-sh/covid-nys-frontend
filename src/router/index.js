const routes = [{
      path: '/',
      mode: 'history',
      component: App,
      meta: {
        title: 'NYS',
        metaTags: [{
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }
    }
  ];
