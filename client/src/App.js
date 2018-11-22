import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Routers from './Route';
import history from './History';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
})


class App extends Component {



  render() {
 
    return (


      //  <Createretro />
      <ApolloProvider client={client}>
      <Provider store={store}>
            {/* <Landingpage /> */}
          <Routers history={history} />
      </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
