   //入口文件
var React=require('react');
var Axios=require('axios');
var ReactDOM=require('react-dom');
var DetailComponent=require('./DetailComponent')
var ListItem = React.createClass({
	getDefaultProps:function(){
			return {
				listurl:"http://10.30.154.91/list.php",
				detailurl:"http://10.30.154.91/detail.php",
				imgPreurl:"http://tnfs.tngou.net/img"
					}
		},

		handlerChangeList:function(e){
			var vm=this;
			console.log(e.target.id);
			var id=e.target.id;
			ReactDOM.unmountComponentAtNode(document.getElementById("list"));
			ReactDOM.render(<DetailComponent detailId={id}/>,document.getElementById("list"));

		},
	render:function(){
		return (
			<div className="col-lg-4">
          		<img className="img-circle imgBox" src={this.props.imgPreurl+this.props.img} alt="Generic placeholder image" />
         		<h2>{this.props.name}</h2>
          		<p>{this.props.description}</p>
          		<p><a className="btn btn-default" href="javascript:void(0)" role="button" id={this.props.id} onClick={this.handlerChangeList}>详情做法 &raquo;</a></p>
		    </div>
			)
	}
});
var ListComponent = React.createClass({
			getDefaultProps:function(){
			return {
				listurl:"http://10.30.154.91/list.php",
				imgPreurl:"http://tnfs.tngou.net/img"
					}
		},
		getInitialState:function(){
			return {
			list:[],
			total:[],
			detail:null
			}
		},
		getData:function(id,page,vm){
			console.log(id,page);
			Axios.get(this.props.listurl,{params:{id:id,page:page}})
			.then(function(res){
				vm.setState({
					list:res.data.tngou,
					total:res.data.total
				})
			})
		},
		handlerPageCick:function(e){
			var vm=this;
			var page =e.target.id;
			console.log(page);
			var id=this.props.categoryId;
			this.getData(vm.props.categoryId,page,vm)
		},
		componentWillMount:function(){
		var vm=this;
		this.getData(vm.props.categoryId,1,vm)
		},
	render:function(){
		var listAall=[];
		var lst=this.state.list;
		var total=this.state.total;
		var totalAall=[];
		if(total){
			var totalLen=Math.ceil(total/30);
			for(var i=1;i<=totalLen;i++){
			totalAall.push( <li key={i}><a href="#" id={i} onClick={this.handlerPageCick}>{i}</a></li>)
			}
		}
		if(lst){
			var lstLen=lst.length;
			for (var i = 0; i <lstLen; i+=3) {
				if(!lst[i+1]){
				listAall.push(
					<div className="row" key={i}>
				        <ListItem {...lst[i]}/>
			      	</div>
				)
				}
				else if(lst[i+1] && !lst[i+2]){
				listAall.push(
					<div className="row" key={i}>
				        <ListItem {...lst[i]}/>
				        <ListItem {...lst[i+1]}/>
			      	</div>
				)
				}
				else{
				listAall.push(
					<div className="row" key={i}>
				        <ListItem {...lst[i]}/>
				        <ListItem {...lst[i+1]}/>
				        <ListItem {...lst[i+2]}/>
			      	</div>
				)
				}
			}
		}
		return (
			<div>
			       <div className="container marketing">
				       <nav>
							  	<ul className="pagination">
								    <li><a href="#">&laquo;</a></li>
								    {totalAall}
								    <li><a href="#">&raquo;</a></li>
			  				  	</ul>
							</nav>
				       {listAall}
				    </div>
			</div>
			)
	}
});
module.exports=ListComponent;

