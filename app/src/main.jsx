//var socket = io.connect("https://coasteasy.com:28015");

var isLocalHost = false;
if (document.location.hostname == "localhost") {
  isLocalHost = true;
} else {
  //socket = io.connect();
}


// React Router
var Router = ReactRouter;
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
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

var LoginButton = React.createClass({
  mixins: [Router.State, Navigation],
  handleShowLogin: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.transitionTo('/login');
  },
  render: function() {
    if (this.props.currentPage !== "login") {
      return (<div id="login">
        <div className="pure-button" id="login-show" onClick={ this.handleShowLogin } onTouchStart={ this.handleShowLogin }>Login</div>
      </div>)
    } else {
      return null;
    }
  }
});

var LogoutButton = React.createClass({
  handleDoLogout: function(e) {
    this.props.handleDoLogout(e);
  },
  render: function() {
    return (<div id="logout" className="logout">
      <div onClick={this.handleDoLogout} onTouchStart={this.handleDoLogout} className="pure-button">Log out</div>
    </div>)
  }
});

var LoginPage = React.createClass({
  mixins: [Router.State, Navigation],
  handleDoLogin: function(e) {
    this.props.handleDoLogin(e);
  },
  handleCancel: function(e) {
    this.transitionTo('/');
  },
  clearLoginMsg: function(e) {
    $('#login-msg').empty();
  },
  render: function() {
    return (<form id="login-form" className="content-area pure-form">
              <div className="form-inner">
                <div><input type="email" id="login-email" name="email" placeholder="Your email" onChange={this.clearLoginMsg} required /></div>
                <div><input type="password" id="login-password" placeholder="Your password" onChange={this.clearLoginMsg} required /></div>
                <div className="form-actions">
                  <div className="submit-div">
                    <input className="pure-button pure-button-primary" type="submit" id="login-submit" value="Log in" onClick={this.handleDoLogin} />
                  </div>
                  <div className="cancel-div>">
                    <div className="pure-button button-transparent" onTouchStart={this.handleCancel} onClick={this.handleCancel}>Cancel</div>
                  </div>
                </div>
                <div className="form-msg" id="login-msg"></div>
              </div>
            </form>
  )}
});

var AddPostButton = React.createClass({
  handleNewPost: function(e) {
    this.props.handleNewPost(e);
  },
  render: function() {
    return (
      <div id="new-post" className="pure-button" onClick={this.handleNewPost} onTouchStart={this.handleNewPost}>Add Post</div>
    )
  }
});

var NewPostPage = React.createClass({
  mixins: [Router.State, Navigation],
  handleAddPost: function(e) {
    this.props.handleAddPost(e);
  },
  handleCancel: function(e) {
    this.transitionTo('/');
  },
  render: function() {
    return (<form id="new-post-form" className="content-area pure-form">
              <div className="form-inner">
                <div><input type="text" id="new-post-title" name="title" placeholder="Title here" required /></div>
                <div><textarea id="new-post-text" name="text" placeholder="Details here" required="required"></textarea></div>
                <div className="form-actions">
                  <div className="submit-div">
                    <input className="pure-button pure-button-primary" type="submit" id="login-submit" value="Create New Post" onClick={this.handleAddPost} />
                  </div>
                  <div className="cancel-div>">
                    <div className="pure-button button-transparent" onTouchStart={this.handleCancel} onClick={this.handleCancel}>Cancel</div>
                  </div>
                </div>
                <div className="form-msg" id="new-post-msg"></div>
              </div>
            </form>
  )}
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
        rows.push(<PostItem post={post} handleVoteUp={this.props.handleVoteUp} key={ post.id } />);
        //lastDate = day;
      }.bind(this));
      return (<div id="posts" className="posts-list">{ rows }</div>);
    } else {
      return (<div id="posts" className="posts-list">No posts found.</div>);
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
  handleVoteUp: function(e) {
    this.props.handleVoteUp(e);
  },
  render: function() {
    return (
      <div className="post">
        <div className="post-info">
          <h2>{ this.props.post.title }</h2>
          <div>{ this.props.post.title }</div>
        </div>
        <div className="post-vote" onTouchStart={this.handleVoteUp} onClick={this.handleVoteUp}>
          <div className="post-vote-btn pure-button">Vote up</div>
        </div>
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
      }
    ];

    if (this.isMounted()) {
      this.setState({
        posts: postsLocal
      });
    }
  },

  componentWillMount: function() {
    Router.HashLocation.addChangeListener(this.handleChangeRoute);
    console.log('componentWillMount');
    var page = this.getPath().split("/")[1];
    if (page === '') { page = "home"; }
    this.setState({currentPage:page});
    // var _this = this;
    // if (isLocalHost == false) {
      // socket.on("posts", function(data) {
      //     _this.setState({
      //       posts: data
      //     });
      //   });
    // } else {
      // get data locally in componentDidMount
    // }
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
      url: 'https://coasteasy.com/api/v1/posts',
      success: function(data) {
        console.log('it worked posts: ',data);
        this.setState({
          posts: data
        });
        var $container = $('#posts');
        $container.packery({
          itemSelector: '.post'
        });
      }.bind(this),
      error: function(data) {
        console.log('error');
      }.bind(this)
    });

    if (docCookies.hasItem('token') && docCookies.hasItem('user_id')) {
      $.ajax({
        type: 'GET',
        url: 'https://coasteasy.com/api/v1/users/' + docCookies.getItem('user_id'),
        headers: { 'x-api-token' : docCookies.getItem('token') },
        success: function(data) {
          console.log('it worked data 123',data);
          this.setState({
            isLogin: true,
            user: data.user
          });
        }.bind(this),
        error: function(data) {
          console.log('error');
        }.bind(this)
      });
    }
    
  },

  handleChangeRoute: function() {
    var page = this.getPath().split("/")[1];
    if (page === '') { page = "home"; }
    this.setState({
      currentPage: page
      // activeCategory: activeCategory,
      // activePage: activePage,
      // activeHighPriority: activeHighPriority,
      // activeEventsTotal: activeEventsTotal,
      // isMap: isMap,
      // isList: isList
    });
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
      url: 'https://coasteasy.com/api/v1/login',
      data: {
        email:$('#login-email').val(),
        password:$('#login-password').val()
      },
      success: function(data) {
        console.log('login success data',data);
        var cookieExpire = 60*60*24*14; // 14 days
        // TODO, make these SECURE only, the last flag should be true...
        docCookies.setItem('token', data.token, cookieExpire, '/', 'coasteasy.com', true);
        docCookies.setItem('user_id', data.user.id, cookieExpire, '/', 'coasteasy.com', true);
        this.setState({
          isLogin: true,
          user: data.user
        });
        this.transitionTo('/');
      }.bind(this),
      error: function(data) {
        $('#login-email').focus();
        console.log('error');
        $('#login-msg').html('Invalid email/password.<br /><a href="mailto:adamjones.ca@gmail.com">Need help?</a>');
      }.bind(this)
    });
  },
  handleDoLogout: function(e) {
    e.preventDefault();
    e.stopPropagation();
    docCookies.removeItem('token','/','coasteasy.com');
    docCookies.removeItem('user_id','/','coasteasy.com');
    this.setState({
      isLogin: false
    });
    this.transitionTo('/');
  },

  handleNewPost: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.transitionTo('/new-post');
  },

  handleAddPost: function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.ajax({
      type: 'POST',
      url: 'https://coasteasy.com/api/v1/posts',
      headers: { 'x-api-token' : docCookies.getItem('token') },
      data: {
        title:$('#new-post-title').val(),
        text:$('#new-post-text').val()
      },
      success: function(data) {
        console.log('login success data',data);
        // this.setState({
        //   posts: data
        // });
        this.transitionTo('/');
      }.bind(this),
      error: function(data) {
        console.log('error');
        $('#new-post-title').focus();
        $('#new-post-msg').html('Here is an error... ugh.');
      }.bind(this)
    });
  },

  handleVoteUp: function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('vote up');
  },

  handleGoHome: function(e) {
    e.preventDefault();
    e.stopPropagation();
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
      isLogin: isLogin,
      user: {},
      currentPage: ''
    };
  },

  render: function () {
    return (
      <div id="content-container" className={ "page-" + this.state.currentPage + " login-" + this.state.isLogin }>

        <div id="header" onClick={this.handleHeaderClick}>
          <div id="logo">
            <h1>
              <a href="/" onClick={this.handleGoHome} onTouchStart={this.handleGoHome}>  
                <svg version="1.1" id="logo-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                	 viewBox="0 0 177.7 177.9" enable-background="new 0 0 177.7 177.9">
                  <path id="XMLID_9_" opacity="0.89" fill="#1C7499" d="M36.9,84.3c2.4-26.6,24.8-47.5,52-47.5s49.6,20.9,52,47.5h36.9
                  	C175.3,37.3,136.4,0,88.9,0S2.4,37.3,0,84.3H36.9z"/>
                  <path id="XMLID_10_" opacity="0.89" fill="#1C7499" d="M48.5,94.3c2.6,20,19.7,35.4,40.4,35.4c5.6,0,10.9-1.1,15.8-3.2
                  	c1.7,3.1,3.4,6.2,5.2,9.2c0.2,0.3,0.3,0.5,0.5,0.7c-6.6,3-13.8,4.7-21.5,4.7c-27,0-49.3-20.6-51.9-46.9H0
                  	c2.8,46.7,41.5,83.6,88.8,83.6s86.1-37,88.8-83.6H48.5z"/>
                  <path id="XMLID_13_" opacity="0.71" fill="#FFCF05" d="M88.8,48.2C68,48.2,50.7,64,48.4,84.3h80.9C127,64,109.7,48.2,88.8,48.2z"/>
                </svg>
              </a>
            </h1>
          </div>
          { this.state.currentPage !== "new-post" ? <AddPostButton handleNewPost={this.handleNewPost} /> : null }
          {/* this.state.isLogin === true ? <LogoutButton handleDoLogout={this.handleDoLogout} user={this.state.user} /> : <LoginButton currentPage={this.state.currentPage} handleDoLogin={this.handleDoLogin} /> */}
        </div>

        <RouteHandler
            posts={this.state.posts}
            handleDoLogin={this.handleDoLogin}
            handleAddPost={this.handleAddPost}
            handleVoteUp={this.handleVoteUp}
         />

      </div>
    );
  }

});


/****** ROUTES *********/

var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="LoginPage" handler={LoginPage} path="login" />
    <Route name="NewPostPage" handler={NewPostPage} path="new-post" />
    <DefaultRoute handler={Posts}/>
  </Route>
);

// Router.run(routes, Router.HistoryLocation, function (Handler, state) {
Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('app'));
});






