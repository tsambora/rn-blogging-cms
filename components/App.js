import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Realm from 'realm';

const BlogSchema = {
  name: 'Blog',
  properties: {
    text: 'string',
  },
};

const USERNAME = 'tsambora';
const PASSWORD = 'tsamboraspw';
const SERVER = 'tsambora-blogging.us1a.cloud.realm.io';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: null,
    };
  }

  componentWillMount() {
    Realm.Sync.User.login(`https://${SERVER}`, USERNAME, PASSWORD)
      .then((user) => {
        Realm.open({
          sync: {
            url: `realms://${SERVER}/~/default`,
            user,
          },
          schema: [BlogSchema],
        })
          .then((realm) => {
            const blogs = realm.objects('Blog');
            this.setState({ blogs });
            realm.write(() => {
              realm.create('Blog', {
                text: 'Hello, World 4',
              });
            });
          });
      });
  }

  render() {
    const info = this.state.blogs
      ? `Number of blogs in this Realm: ${this.state.blogs.toString()}`
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
      </View>
    );
  }
}
