import Realm from 'realm';

class Blog extends Realm.Object {}
Blog.schema = {
  name: 'Blog',
  properties: {
    text: 'string',
  },
};

// export default new Realm({
//   schema: [Blog],
//   sync: {
//     user: 'realm-admin',
//     url: 'https://tsambora-blogging.us1a.cloud.realm.io',
//     error: err => console.log(err),
//   },
// });

export default {
  realm: null,
  initialize: (username, password) => {
    Realm.Sync.User.login('https://tsambora-blogging.us1a.cloud.realm.io', 'tsambora', 'tsamboraspw', (error, user) => {
      if (!error) {
        this.realm = new Realm({
          sync: {
            user,
            url: 'https://tsambora-blogging.us1a.cloud.realm.io/~/default',
          },
          schema: [Blog],
        });
        alert(JSON.stringify(this.realm));
      } else {
        alert(error);
      }
    });
  },
};
