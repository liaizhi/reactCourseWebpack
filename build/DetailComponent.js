   //入口文件
var React=require('react');
var Axios=require('axios');
var ReactDOM=require('react-dom');
var DetailComponent = React.createClass({
	getDefaultProps:function(){
			return {
				detailurl:"http://10.30.154.91/detail.php",
				imgPreurl:"http://tnfs.tngou.net/img"
					}
		},
			getInitialState:function(){
			return {
			detail:""
			}
		},
		componentWillMount:function(){
		var vm=this;
		Axios.get(this.props.detailurl,{params:{id:vm.props.detailId}})
			.then(function(res){
				vm.setState({
					detail:res.data
				})
			})
		},
		
	render:function(){
		var data=this.state.detail;
		var imgUrl=this.props.imgPreurl+data.img;
		return (
			<div className="container marketing">
			  <div className="row">
				<div className="col-lg-6 col-lg-offset-3" >
	          		<img className="img-circle imgBox" src={imgUrl} alt="Generic placeholder image" />
	         		<h2>{data.name}</h2>
	          		<p>{data.description}</p>
			    </div>
			  </div>
		    </div>
			)
	}
});

module.exports=DetailComponent;

