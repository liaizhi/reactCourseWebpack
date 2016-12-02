//入口文件
var React=require('react');
var ReactDom=require('react-dom');
var HeaderComponent=require('./HeaderComponent.js');
var ListComponent=require('./ListComponent.js');
var FooterComponent=require('./FooterComponent.js');
var LayoutComponent = React.createClass({
	getInitialState:function(){
		return {
		}
	},
	onCategoryChange:function(nextcategoryId){
		var listObj=document.getElementById('list');
		ReactDom.unmountComponentAtNode(listObj);
		ReactDom.render(<ListComponent categoryId={nextcategoryId}/>,listObj);
	},
	render:function(){
		return (
			<div>
			<header id="header">
			<HeaderComponent callbackParent={this.onCategoryChange}/>
			</header>
			<section id="list">
			</section>
			<footer id="footer">
			<FooterComponent/>
			</footer>
			
			</div>
			)
	}
});
ReactDom.render(<LayoutComponent/>,document.getElementById('app'));//入口文件
ReactDom.render(<ListComponent categoryId='188'/>,document.getElementById('list'));
