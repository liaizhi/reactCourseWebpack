//入口文件
var React=require('react');
var Axios=require('axios');
var ReactDOM=require('react-dom');
var HomeComponent=require('./HomeComponent.js');
var AboutComponent=require('./AboutComponent.js');
var ContactComponent=require('./ContactComponent.js');
var HeaderComponent = React.createClass({
	getDefaultProps:function(){
			return {
				url:"http://10.30.154.91/categories.php"
					}
		},
		getInitialState:function(){
			return {
			categories:''
					}
		},
		componentWillMount:function(){
		var _this=this;
		Axios.get(this.props.url)
		.then(function(res){
				_this.setState({
				categories:res.data.tngou
					})
			})
		},
		handleClick:function(e){
			var _title=e.target.getAttribute('title');
			var listObj=document.getElementById('list');
			switch(_title){
				case "home":
				ReactDOM.render(<HomeComponent/>,listObj);
				break;
				case "about":
				ReactDOM.render(<AboutComponent/>,listObj);
				break;
				case "contact":
				ReactDOM.render(<ContactComponent/>,listObj);
				break;
			}

		},
		handleChange:function(e){
			var categoryId = e.target.id;
			this.props.callbackParent( e.target.id);
		},
	render:function(){
		var msg=[];
		var cats=this.state.categories;
		var catslen=this.state.categories.length;
			for(var i=0;i<catslen;i++){
				msg.push(<li key={i}><a href="#" id={cats[i].id} onClick={this.handleChange}>{cats[i].name}</a></li>)
				}
		return (
			<div>
				<div className="navbar-wrapper">
				    <div className="container">
				        <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
				          <div className="container">
				            <div className="navbar-header">
				              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				                <span className="sr-only">Toggle navigation</span>
				                <span className="icon-bar"></span>
				                <span className="icon-bar"></span>
				                <span className="icon-bar"></span>
				              </button>
				              <a className="navbar-brand" href="#">Project name</a>
				            </div>
				            <div id="navbar" className="navbar-collapse collapse">
				              <ul className="nav navbar-nav">
				                <li className="active"><a title="home" href="#"onClick={this.handleClick}>首页</a></li>
				                <li><a href="#about" title="about" onClick={this.handleClick}>关于我们</a></li>
				                <li><a href="#contact" title="contact" onClick={this.handleClick}>联系我们</a></li>
				                <li className="dropdown">
				                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">菜品分类 <span className="caret"></span></a>
				                  <ul className="dropdown-menu" role="menu">
				                    {msg}
				                  </ul>
				                </li>
				              </ul>
				            </div>
				          </div>
				        </nav>

				      </div>
				    </div>
			</div>
			)
	}
})
module.exports=HeaderComponent;
