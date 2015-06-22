//var socket = io.connect("https://coastconnect.ca:28015");

var isLocalHost = false;
if (document.location.hostname == "localhost") {
  isLocalHost = true;
} else {
  //socket = io.connect(); 
}


// React Router
var Router = ReactRouter;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;
var RouteHandler = Router.RouteHandler;
var PropTypes = React.PropTypes;


/****** CONVENIENCE FUNCTIONS *********/

function slugify(text) {
  // console.log('slugify: TODO: do this on the server!');
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/\:+/g, '-')           // Replace colon with dash
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .trim()                         // Trim whitespace
}
function randomStr(num) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < num; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function hideMenus() {
  if (document.getElementById("whatever-menu") !== null) {
    document.getElementById("whatever-menu").classList.remove('menu-show');
  }
}


/****** COOKIES *********/

var docCookies = {
  /*\
  |*|  :: cookies.js :: A complete cookies reader/writer framework with full unicode support.
  |*|  Revision #1 - September 4, 2014
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  \*/
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};


/****** COMPONENTS *********/

var Login = React.createClass({
  handleDoLogin: function(e) {
    this.props.handleDoLogin(e);
  },
  clearLoginMsg: function(e) {
    $('#login-msg').empty();
  },
  handleShowLogin: function(e) {
    console.log('handleShowLogin');
    e.preventDefault();
    e.stopPropagation();
    this.props.handleShowLogin(e);
  },
  render: function() {
    return (<div id="login">
      <div id="login-show" onClick={ this.handleShowLogin } onTouchStart={ this.handleShowLogin }>Login.</div>
    </div>)
  }
});

var Logout = React.createClass({
  handleDoLogout: function(e) {
    this.props.handleDoLogout(e);
  },
  render: function() {
    return (<div id="logout" className="logout" onClick={this.handleDoLogout}>
      <a href="#">Log out</a>
    </div>)
  }
});

var Posts = React.createClass({ 
  render: function () {
    if (this.props.posts !== undefined) {
      var posts = this.props.posts;
      var rows = [];
      // var lastDate = null;
      posts.forEach(function(post, index) {
        // var date = new Date(posts.date_added * 1000);
        // var day = date.getDay();
        // if (day !== lastDate) {
        //   rows.push(<PostDate date={date} key={ post.id + randomStr(5) } />);
        // }
        rows.push(<PostItem post={ post } key={ post.id } />);
        //lastDate = day;
      }.bind(this)); 
      return (<div className="posts-list">{ rows }</div>);
    } else {
      return (<div className="posts-list">No posts found.</div>);
    }
  }
}); 

{/*
  var PostDate = React.createClass({ 
  render: function () {
    return (
      <div>date here</div>
    ); 
  }
});
*/}

var PostItem = React.createClass({
  mixins: [Router.State, Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="post">
        <h2>{ this.props.post.title }</h2>
        <div>{ this.props.post.title }</div>
      </div>
    )
  }
});

var App = React.createClass({
  mixins: [Router.State, Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  
  getCategoryNameFromSlug: function(slug) {
    if (slug == "my-posts") {
      return "my streams"
    } else if (slug == "all-posts") {
      return "all streams"
    } else {
      return slug
    }
  },

  getLocalHostData: function () {
    var postsLocal = [
      {
        "id": "abc123",
        "title":  "hello world",
        "text":  "This here is the text",
        "date_added": 'Tue May 05 2015 19:53:51 GMT+00:00',
        "lat": 49.288028,
        "long": -122.865729
      },
      {
        "id": "hola",
        "title":  "hi again",
        "text":  "another block of text here",
        "date_added": 'Tue May 05 2015 19:33:51 GMT+00:00',
        "lat": 49.288028,
        "long": -122.865729
      },
    ];

    if (this.isMounted()) {
      this.setState({
        posts: postsLocal
      });
    }
  },
  
  /*
  getPosts: function() {
    //
  },
  */
  
  componentWillMount: function() {
    Router.HashLocation.addChangeListener(this.handleChangeRoute);
    var _this = this;
    if (isLocalHost == false) {
      // socket.on("posts", function(data) {
      //     _this.setState({
      //       posts: data
      //     });
      //   });
    } else {
      // get data locally in componentDidMount        
    }
  },
  componentWillUnmount: function() {
    Router.HashLocation.removeChangeListener(this.handleChangeRoute);
  },
  componentDidMount: function() {
    if (isLocalHost == true) {
      this.getLocalHostData();
    }
    //this.getPosts();
    $.ajax({
      type: 'GET', 
      url: 'https://coastconnect.ca/api/v1/posts',
      success: function(data) {
        console.log('it worked posts: ',data);
        this.setState({ 
          posts: data
        });
      }.bind(this),
      error: function(data) {
        console.log('error');
      }.bind(this)
    });
    
    if (docCookies.hasItem('token') && docCookies.hasItem('user_id')) {
      $.ajax({
        type: 'GET', 
        url: 'https://coastconnect.ca/api/v1/users/' + docCookies.getItem('user_id'),
        headers: { 'x-api-token' : docCookies.getItem('token') },
        success: function(data) {
          console.log('it worked data',data);
          this.setState({ 
            isLogin: true, 
            user_id: data.user_id
          });
        }.bind(this),
        error: function(data) {
          console.log('error');
        }.bind(this)
      });
    }
  },
  
  handleShowLogin: function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("login-form").classList.toggle('div-show-block');
    document.getElementById("login-show").classList.toggle('div-show-hide');
  },

  handleChangeRoute: function() {
    console.log('change route');
    // this.setState({
    //   currentEvents: currentEvents,
    //   activeCategory: activeCategory,
    //   activePage: activePage,
    //   activeHighPriority: activeHighPriority,
    //   activeEventsTotal: activeEventsTotal,
    //   isMap: isMap,
    //   isList: isList
    // }); 
  },
  handleFlagItem: function(item,e) {
    e.preventDefault();
    e.stopPropagation();
    var flaggedArray = this.state.flagged;
    var index = flaggedArray.indexOf(item);
    if ( index > -1 ) {
      flaggedArray.splice(index, 1);
    } else {
      flaggedArray.push(item);
    }
    this.setState({
      flagged:flaggedArray
    });
    if (docCookies.hasItem('token') && docCookies.hasItem('user_id')) {
      $.ajax({
        type: 'PUT',
        headers: { 'x-api-token' : docCookies.getItem('token') },
        url: 'https://alpha.stream.vu/users/' + docCookies.getItem('user_id'),
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify({flagged: flaggedArray}),
        success: function(data) {
          console.log('success flagged data: ',data);
          console.log('todo: add/remove optimistic js to prevent page close');
          $.ajax({
            type: 'GET', 
            url: 'https://alpha.stream.vu/flags/' + docCookies.getItem('user_id'),
            headers: { 'x-api-token' : docCookies.getItem('token') },
            success: function(data) {
              console.log('flags are...', data);
              this.setState({
                flaggedEvents: data
              });
            }.bind(this),
            error: function(data) {
              console.log('error');
            }.bind(this)
          });
        }.bind(this),
        error: function(data) {
          console.log('error flagging data');
        }.bind(this)
      });

    }
  },
  
  handleDoLogin: function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.ajax({
      type: 'POST', 
      url: 'https://coastconnect.ca/api/v1/login',
      data: {
        email:$('#login-email').val(),
        password:$('#login-password').val()
      },
      success: function(data) {
        console.log('login success data',data);
        var cookieExpire = 60*60*24*14; // 14 days
        // TODO, make these SECURE only, the last flag should be true...
        // docCookies.setItem('token', data.token, cookieExpire, '/', 'www.coastconnect.ca', true);
        // docCookies.setItem('user_id', data.id, cookieExpire, '/', 'www.coastconnect.ca', true);
        docCookies.setItem('token', data.token, cookieExpire, '/', 'www.coastconnect.ca');
        docCookies.setItem('user_id', data.id, cookieExpire, '/', 'www.coastconnect.ca');
        this.setState({ 
          isLogin: true, 
          user_id: data.id
        }); 
      }.bind(this),
      error: function(data) {
        $('#login-email').focus();
        console.log('error');
        $('#login-msg').html('Invalid email/password. <a href="mailto:info@coastconnect.ca">Need help?</a>');
      }.bind(this)
    });
  },
  handleDoLogout: function(e) {
    e.preventDefault();
    e.stopPropagation();
    docCookies.removeItem('token','/','www.coastconnect.ca');
    docCookies.removeItem('user_id','/','www.coastconnect.ca');
    this.setState({
      isLogin: false
    });
    this.transitionTo('/');
  },
  
  getInitialState: function() {
    
    if (docCookies.hasItem('token')) {
      var isLogin = true;
    } else {
      var isLogin = false;
    }
    return { 
      posts: [],
      isLogin: false,
      user_id: false
    };
  },
  
  render: function () {
    return (
      <div className={ "page-" + this.state.activePage + " login-" + this.state.isLogin }>
      
        <div id="header" onClick={this.handleHeaderClick}>
          <div id="logo"><h1><a href="/">Coast Connect</a></h1></div>
          { this.state.isLogin === true ? <Logout handleDoLogout={ this.handleDoLogout } /> : <Login handleShowLogin={ this.handleShowLogin } handleDoLogin={this.handleDoLogin} /> }
        </div>
            
        <form id="login-form"> 
          <input type="email" id="login-email" name="email" placeholder="Your email" onChange={this.clearLoginMsg} required />
          <input type="password" id="login-password" placeholder="Your password" onChange={this.clearLoginMsg} required />
          <input type="submit" id="login-submit" value="Log in" onClick= {this.handleDoLogin} />
          <div id="login-msg"></div>
        </form>
          
        <RouteHandler posts={this.state.posts} />
          
      </div>
    );
  }

});


/****** ROUTES *********/

var routes = (
  <Route name="home" handler={App} path="/">
    <DefaultRoute handler={Posts}/>
  </Route> 
); 

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('app')); 
});




