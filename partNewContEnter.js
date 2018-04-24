var cusManaCode;
var manaName;
var contNum;
var bankCode;
var now = new Date(); 
var num=0;
var number=0;//纳税人识别号的个数
var number1=0;//投资账户的个数
var sum=0;
var riskTypeflag;
var str = parm.split(";");
var mytype="fwv-20";

$(document).ready(function(){  
	
	$.ajax({
		type : "POST",
		url:path+'/newContEnter/searchRiskTypeBean.do',// 后台请求URL地址  
		data : {"riskcode":riskCode},
		dataType : "json",
		success : function(data) {
			if(data.risktype=="01"){
				riskTypeflag = data.risktype;
				arraid[6]="fwv-21s";
				$("#displayBtn").click();
			}
			
			//如果产品为这三种，年金领取方式不适用，红利给付方式不适用
			if(data.riskcode=="@MA" || data.riskcode=="@JN" || data.riskcode=="@JZ"){
				$("#displayButton").click();
			}
			//险种码为 @SD
			if(data.riskcode=='@SD'){
				$("#displayButton1").click();
			}
			
			if(data.riskcode=='@SC'){
				$("#displayButton2").click();
			}
		}
	});
	
});

var arr=new Array();
var arra=new Array();
var arraid=['fwv-2s','fwv-5s','fwv-3s','fwv-4s','fwv-7s','fwv-22s','fwv-20s','fwv-6s'];
var arraname=['投保人','税收','被保人','受益人','主险','附加险','情况告知'];
var fwid="fwv-20";
$(function(){
	$('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

	   var activeTaa = $(e.target).attr("href");
		 var activeTab = $(e.relatedTarget).attr("href");
		//  alert(tab2);
		 arra=activeTaa.split("#");
		 arr=activeTab.split("#");
		 //form的id
		 var id=arr[1];
		 var id1=arra[1];
		
		 //alert(id);
		 //alert(id1);
		 //input状态
		 var sa= $("#"+id+"s").val();
		 var ss= $("#"+id1+"s").val();
		 //如果为0不跳转
		 if(ss==0){
			 alert("请保存")
			 $("#"+id1+"s").val("0");
			 return false;
		  }else{
			  //alert("跳转");
			  //改变状态并跳转
			  $("#"+id1+"s").val("1");
			  e.target;
				 
		  }
	 
	});
	
	$('a[data-toggle="tab"]').click('show.bs.tab', function(e) {

			 var activeTaa = $(e.target).attr("href");
			 var activeTab = $("#infoUl").find('.active:last a').attr("href");
			 arra=activeTaa.split("#");
			 arr=activeTab.split("#");
			 var id=arr[1];
			 var id1=arra[1];
			
			 //input状态
			 var sa= $("#"+id+"s").val();
			 var ss= $("#"+id1+"s").val();
			 //如果为0不跳转
			 if(ss==0){
				  for(var i=0;i<arraid.length;i++){
					  if(id1+"s"==arraid[i]){
						  if(i>0){
							  var sum="";
							  for(var j=0;j<=i;j++){
								 if($("#"+arraid[j]).val()==0){
								     sum=sum+" "+arraname[j-1];
								 }
							  }
							  if(sum!=""){
								  alert("请保存以下信息：\r\n"+sum)
								  return false;
							  }
						  }
					  }
				  }
				 return false;
			  }else{
				  for(var i=0;i<arraid.length;i++){
					  if(id1+"s"==arraid[i]){
						  if(i>0){
							  var sum="";
							 for(var j=0;j<=i;j++){
									  if($("#"+arraid[j]).val()==0){
										  sum=sum+" "+arraname[j-1];
									  }
							      }
							 if(sum!=""){
								  alert("请保存以下信息：\r\n"+sum)
								
									  return false;
							}
						  }
					  }
				  }

			  }
	});
})


//-----------------------------------------------------预加载---数据绑定---------------------------------------------------------

$(function(){
//添加受益人
addbenefer();
//添加附加险
addbenefer1();

if(grpcontno!="null" && grpcontno!="" && grpcontno!=null){  //如果URL传过来数据grpcontno
	//账户查询
	$.ajax({
		url:path + '/newContEnter/selectAccNo.do',  
	    type: "POST",
	    data:{"cifid":grpcontno},
	    async: false,
		success: function(data){
			for(var i=0;i<data.length;i++){
				//如果客户账户是联名账户加（联）  accountstatus
				if(data[i].accountstatus=='Y'){
					var select=document.getElementById("newbankaccno");
				    var option=document.createElement("option");
				    var str = "（联）"+data[i].accountnumber;
					option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
					option.innerHTML=str;
					select.appendChild(option);	
				}else{
					//非联名账户加（个）
					var select=document.getElementById("newbankaccno");
				    var option=document.createElement("option");
					var str = "（个）"+data[i].accountnumber;
					option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
					option.innerHTML=str;
					select.appendChild(option);	
				}
			}
		}
	});
}
//数据绑定，goaltype
$.ajax({
	url:path + '/LdcodeController/selectLcodeByCodetype.do',  
    type: "POST",
    async: false,
    data:{"codetype":"goaltype"},
	success: function(data){
		for(var i=0;i<data.length;i++){
			var select=document.getElementById("GoalType");
			var option=document.createElement("option");
			option.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option.innerHTML=data[i].code+"-"+data[i].codename;
			select.appendChild(option);	 
		}
	}
});

//数据绑定，职位及工作内容
$.ajax({
	url:path + '/LdcodeController/selectLcodeByCodetype.do',  
    type: "POST",
    async: false,
    data:{"codetype":"responsibility"},
	success: function(data){
		 for(var i=0;i<data.length;i++){
			 var select=document.getElementById("Responsibility");  //投保人
			 var option=document.createElement("option");
			 option.value=data[i].code.replace(/^\s+|\s+$/g, '');
			 option.innerHTML=data[i].code+"-"+data[i].codename;
			 select.appendChild(option);	
			 
			 var select1=document.getElementById("lcinsuredresponsibility");  //被保人
			 var option1=document.createElement("option");
			 option1.value=data[i].code.replace(/^\s+|\s+$/g, '');
			 option1.innerHTML=data[i].code+"-"+data[i].codename;
			 select1.appendChild(option1);
		 }
	 }
 });

//投连险投资账户
$.ajax({
	 url:path + '/LdcodeController/selectLcodeByCodetype.do',  
     type: "POST",
     async: false,
     data:{"codetype":"joinaccount"},
	 success: function(data){
		 for(var i=0;i<data.length;i++){
			var select=document.getElementById("a0");   //投资账户1
		    var option=document.createElement("option");
			option.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option.innerHTML=data[i].code+"-"+data[i].codealias;
			select.appendChild(option);	
			
			var select1=document.getElementById("a1");  //投资账户2
		    var option1=document.createElement("option");
			option1.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option1.innerHTML=data[i].code+"-"+data[i].codealias;
			select1.appendChild(option1);
			
			var select2=document.getElementById("a2");  //投资账户3
		    var option2=document.createElement("option");
			option2.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option2.innerHTML=data[i].code+"-"+data[i].codealias;
			select2.appendChild(option2);
			
			var select3=document.getElementById("a3");  //投资账户4
		    var option3=document.createElement("option");
			option3.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option3.innerHTML=data[i].code+"-"+data[i].codealias;
			select3.appendChild(option3);
			
			var select4=document.getElementById("a4");  //投资账户5
		    var option4=document.createElement("option");
			option4.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option4.innerHTML=data[i].code+"-"+data[i].codealias;
			select4.appendChild(option4);
			
		 }
	 }
});

//国籍查询
$.ajax({
	url:path + '/LdcodeController/selectLcodeByCodetype.do',  
    type: "POST",
    async: false,
    data:{"codetype":"iss_country"},
	success: function(data){
		for(var i=0;i<data.length;i++){  
			var select=document.getElementById("field-16");  //投保人国籍
			var option=document.createElement("option");
			option.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option.innerHTML=data[i].code+"-"+data[i].codename;
			select.appendChild(option);	
				
			var select1=document.getElementById("LCInsurednativeplace");  //被保人国籍
			var option1=document.createElement("option");
			option1.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option1.innerHTML=data[i].code+"-"+data[i].codename;
			select1.appendChild(option1);
		}
	}
});

//与被保人的关系
$.ajax({
	url:path + '/LdcodeController/selectLcodeByCodetype.do',  
    type: "POST",
    async: false,
    data:{"codetype":"relationformanu"},
	success: function(data){
		for(var i=0;i<data.length;i++){
			var select=document.getElementById("relationtoappnt"); //投保人与被保人关系
			var option=document.createElement("option");
			option.value=data[i].code.replace(/^\s+|\s+$/g, '');
			option.innerHTML=data[i].code+"-"+data[i].codename;
			select.appendChild(option);
				 
			if(data[i].code!='00'){
				var select1=document.getElementById("relationtoinsured0"); //受益人与投保人关系，受益人为身故受益人，不能为本人
				var option1=document.createElement("option");
				option1.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option1.innerHTML=data[i].code+"-"+data[i].codename;
				select1.appendChild(option1);
					 
				var select2=document.getElementById("relationtoinsured1"); //受益人2
				var option2=document.createElement("option");
				option2.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option2.innerHTML=data[i].code+"-"+data[i].codename;
				select2.appendChild(option2);
					 
				var select3=document.getElementById("relationtoinsured2");  //受益人3
				var option3=document.createElement("option");
				option3.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option3.innerHTML=data[i].code+"-"+data[i].codename;
				select3.appendChild(option3);
			}
		}
	}
});
//证件类型
$.ajax({
	url:path + '/LdcodeController/selectIdTypeByCodetype.do',  
    type: "POST",
    data:{"codetype":"idtype"},
    async: false,
	success: function(data){
		for(var i=0;i<data.length;i++){
			if(data[i].code!='D'){
				var select=document.getElementById("AnotherHolderIdType"); //另一持有人证件类型
				var option=document.createElement("option");
				option.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option.innerHTML=data[i].code+"-"+data[i].codename;
				select.appendChild(option);
					 
				var select1=document.getElementById("field-9");  //投保人证件类型
				var option1=document.createElement("option");
				option1.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option1.innerHTML=data[i].code+"-"+data[i].codename;
				select1.appendChild(option1);
					 
				var select2=document.getElementById("LCInsuredidtype"); //被保人证件类型
				var option2=document.createElement("option");
				option2.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option2.innerHTML=data[i].code+"-"+data[i].codename;
				select2.appendChild(option2);
					 
				var select3=document.getElementById("beneIdCard0"); //受益人1
				var option3=document.createElement("option");
				option3.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option3.innerHTML=data[i].code+"-"+data[i].codename;
				select3.appendChild(option3);
					 
				var select4=document.getElementById("beneIdCard1");  //受益人2
				var option4=document.createElement("option");
				option4.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option4.innerHTML=data[i].code+"-"+data[i].codename;
				select4.appendChild(option4);
					 
				var select5=document.getElementById("beneIdCard2"); //受益人3
				var option5=document.createElement("option");
				option5.value=data[i].code.replace(/^\s+|\s+$/g, '');
				option5.innerHTML=data[i].code+"-"+data[i].codename;
				select5.appendChild(option5);
			} 
		 }
	}
});	
//保险公司
$.ajax({
	url:path + '/newContEnter/selectFromLacom.do',  
    type: "POST",
    async: false,
	success: function(data){
		for(var i=0;i<data.length;i++){
			var select=document.getElementById("field-1");
		    var option=document.createElement("option");
			option.value=data[i].agentcom.replace(/^\s+|\s+$/g, '');;
			option.innerHTML=data[i].agentcom+"-"+data[i].name;
			select.appendChild(option);	
		 }
	}
});

//职业代码
$.ajax({
	url:path + '/newContEnter/selectByLdoccupationVo.do',  
	type: "POST",
	async: false,
	success: function(data){
		for(var i=0;i<data.length;i++){
			var select=document.getElementById("field-17");  //投保人职业代码
			var option=document.createElement("option");
			option.value=data[i].occupationcode.replace(/^\s+|\s+$/g, '');;
			option.innerHTML=data[i].occupationcode+"-"+data[i].occupationname;
			select.appendChild(option);
					
			var select1=document.getElementById("LCInsuredoccupationcode");  //被保人职业代码
			var option1=document.createElement("option");
			option1.value=data[i].occupationcode.replace(/^\s+|\s+$/g, '');;
			option1.innerHTML=data[i].occupationcode+"-"+data[i].occupationname;
			select1.appendChild(option1);
		}
	}
});
if(riskCode!="null" && riskCode!="" && riskCode!=null){ //如果URL传过来数据riskCode
	//险种信息
	$.ajax({
		url:path + '/newContEnter/searchRiskTypeBean.do',  
	    type: "POST",
	    data:{"riskcode":riskCode},
	    async: false,
		success: function(data){				
			var select=document.getElementById("riskcode");
			var option=document.createElement("option");
			option.value=data.riskcode;
			option.innerHTML=data.riskcode+"-"+data.riskname;
			select.appendChild(option);
		}
	});
	
	//查询附加险
	$.ajax({
		url:path + '/newContEnter/selectlmrisk.do',  
		type: "POST",
		async: false,
		data:{"riskcode":riskCode},
		success: function(data){
			//如果主险不存在附加险，附加险页面全部为不可操作----置灰
			if(data.length<1){
				$("#fwv-22b input").attr("disabled","true");
				$("#fwv-22b select").attr("disabled","true");
			}else{
				//附加险1绑定数据
				for(var i=0;i<data.length;i++){
					var select=document.getElementById("riskcode1");
					var option=document.createElement("option");
					option.value=data[i].riskCode;
					option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
					select.appendChild(option);	
				}
				//附加险2绑定数据
				for(var i=0;i<data.length;i++){
					var select=document.getElementById("riskcode2");
					var option=document.createElement("option");
					option.value=data[i].riskCode;
					option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
					select.appendChild(option);	
				}
				//附加险3绑定数据
				for(var i=0;i<data.length;i++){
					var select=document.getElementById("riskcode3");
					var option=document.createElement("option");
					option.value=data[i].riskCode;
					option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
					select.appendChild(option);	
				}
			}
		}
	});
	
}

//税收页面地址绑定
selectCity('cnnativeheath_isscountry','cnnativeheath_province','cnnativeheath_city','cnnativeheath_address');

selectCity('loc_province-sub1','loc_city-sub1','loc_town-sub1',"postaladdress");
selectCity('loc_province-sub2','loc_city-sub2','loc_town-sub2',"homeaddress");


//---------------------------------------------------select下面的option加值结束-------------------------------------------

//----------------------------------------------------赋值开始----------------------------------------------------------


//网点  签署地
$.ajax({
	url:path + '/newContEnter/selectCityAndSign.do',  
	type: "POST",
	async: false,
	success: function(data){
		if(data!=null){
			$("#branchNo").val(data.branchNo);
			$("#sign").val(data.sign);
		}
	 }
});
		 
//选择日期后日期板关闭
$('.datepicker1').datepicker({
	format: "yyyy-mm-dd",
	anguage: "zh-CN",
	autoclose: true
});

//税收页面设置为灰色，需要点击按钮可以输入,告知页面的所有输入框都不能输入
$(function(){
	$(".disabletDiv input").attr("disabled","true");   //税收页面下所有input置灰
	$(".disabletDiv select").attr("disabled","true");  //税收页面下所有select置灰
	$(".disabletDiv textarea").attr("disabled","true");//税收页面下所有textarea置灰
	$(".disabletDiv button").attr("disabled","true");  //税收页面下所有button置灰
	$("#fwv-20b input").attr("disabled","true");   //告知录入下面的input
	$("#fwv-21b input").attr("disabled","true");
	$("#InsuHight").removeAttr("disabled");
	$("#AppHeight").removeAttr("disabled");
	$("#InsuWeight").removeAttr("disabled");
	$("#AppWeight").removeAttr("disabled");
	$("#diseases").removeAttr("disabled");
	$("#hospital").removeAttr("disabled");
	$("#TimeOfIllness").removeAttr("disabled");
	$("#condition").removeAttr("disabled");
});

if(flag=="1"){
	$("#field-6").val(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());//投保日期	
	$("#grpcontno").val(grpcontno);
	$("#save3").attr("disabled",true); //被保险人
	$("#save4").attr("disabled",true); //受益人信息
	$("#save6").attr("disabled",true);//试算
	$("#save8").attr("disabled",true);//试算
	$("#save9").attr("disabled",true);//延迟扣款
	$("#save10").attr("disabled",true);//投保单打印
	document.getElementsByName("InvestmentStartDateFlag")[0].checked="checked"; //投资起始日期默认选中签单后立即投资
	
	//查询ldcustomer,数据回显goalType;
	$.ajax({
		url:path + '/newContEnter/selectldcustomer.do',  
        type: "POST",
        data:{"cifid":grpcontno},
		success: function(data){
			 if(data.goaltype=='N'){
				 $("#GoalType").select2("");
			 }else{
				 $("#GoalType").select2("val",data.goaltype); 
			 }
		 }
    });
		
	$.ajax({
		url:path + '/newContEnter/selectldcustomeraddress.do',  //查询ldcustomeraddress，从HUB获取E-mail
		type: "POST",
		data:{"cifid":grpcontno},
		success: function(data){
			if(data != null){
				$("#field-23").val(data.emailaddress); //E-mail
			}
		}
	});
			
	 $.ajax({
		url:path + '/newContEnter/selectldcustomer.do',    //从HUB里获取投保人信息---ldcustomer表
		type: "POST",
		data:{"cifid":grpcontno},
		success: function(data){
			$("#field-9").select2("val",data.idtype); //投保人证件类型
			$("#field-9").attr("disabled",true);
						
			$("#field-11").select2("val",data.gender); //投保人性别
			$("#field-11").attr("disabled",true);
						
			$("#field-10").val(data.idnumber); //投保人证件号码
			$("#field-10").attr("disabled",true);
						
			$("#field-16").select2("val",data.nationality); //投保人国籍
			$("#field-16").attr("disabled",true);
						
			$("#field-8").val(data.fullnamechinese); //投保人姓名
			$("#field-8").attr("disabled",true);
						
			$("#field-22").val(data.mobilephoneno); //投保人移动电话
						
			var oDate1=data.idexpiry;
			var a=oDate1.substring(0,4);
			var b=oDate1.substring(4,6);
			var c=oDate1.substring(6,8);
			var d=a+"-"+b+"-"+c;
			$("#field-15").val(d);  //投保人证件有效止期
						
			var oDate2=data.dateofbirth;
			var a1=oDate2.substring(0,4);
			var b1=oDate2.substring(4,6);
			var c1=oDate2.substring(6,8);
			var d1=a1+"-"+b1+"-"+c1
			$("#field-12").val(d1); //投保人出生日期
			$("#field-12").attr("disabled",true);
						
			if(data.income=="N"){
				$("#field-33").val("");
			}else{
				$("#field-33").val(data.income);
			}
			
			if(data.totalincome=="N"){
				$("#field-19").val("");
			}else{
				$("#field-19").val(data.totalincome);
			}
		}
	});

	$("#save6").attr("disabled",true);//试算
	$("#save6").removeClass("btn btn-primary");
	$("#save6").addClass("btn btn-primaryis");
						
	$("#save8").attr("disabled",true);//试算
	$("#save8").removeClass("btn btn-primary");
	$("#save8").addClass("btn btn-primaryis");
						
						
	$("#save7").attr("disabled",true);//试算
	$("#save7").removeClass("btn btn-primary");
	$("#save7").addClass("btn btn-primaryis");
							       			
	$("#save9").attr("disabled",true);//试算
	$("#save9").removeClass("btn btn-primary");
	$("#save9").addClass("btn btn-primaryis");
							       			
	$("#save10").attr("disabled",true);//试算
	$("#save10").removeClass("btn btn-primary");
	$("#save10").addClass("btn btn-primaryis");

	$("#save2").removeAttr("disabled"); //被保险人
	$("#field-1").select2("val",tContNo);
}else if(flag==2){   //继续录入
	selectCont(transno);			
}else if(flag==3){   //投保单查看
	$("#fwv-5s").val("1");
	$("#fwv-3s").val("1");
	$("#fwv-4s").val("1");
	$("#fwv-7s").val("1");
	$("#fwv-22s").val("1");
	$("#fwv-21s").val("1");
	$("#fwv-20s").val("1");
	$("#fwv-6s").val("1");
	selectCont(transno);
	$("#save2").hide(); //被保险人
	//$("#additional").hide();//隐藏添加附加险按钮
	$("#save3").hide(); //被保险人
	$("#save4").hide(); //受益人信息
	//$("#addbene").hide(); //添加受益人
	$("#save5").hide(); //产品信息保存
	$("#save15").hide();//告知录入
	$("#save16").hide();
	$("#save1").hide();//税收信息
	$("#addbene").hide();//税收信息
	$("#save6").hide();//试算
	$("#save8").hide();//试算
	$("#save7").hide();//扣款
	$("#save0").hide();//附加险
	$("#save9").hide();//延迟扣款
	$("#save10").hide();//投保单打印
	$(".editor").hide()//所有的编辑按钮
	$("#save11").attr("disabled",true);//提交
	$("input[type='text'").attr("disabled",true);
	$("select").attr("disabled",true);
	$("select").attr("disabled",true);
}else if(flag==4){ //投保单复制
	selectInfo(transno);
}

});
//----------------------------------------------------预加载结束-----------------------------------------------------


//----------------------------------------------------事件方法开始----------------------------------------------------

//被保人选择本人
$("#relationtoappnt").click(function(){
	
	var tbRelation= $("#relationtoappnt").val();//投被保人是否为同一个人
	
	if(tbRelation=="00"){ //如果是本人
		
		var appntName=$("#field-8").val();//投保人姓名
		var company=$("#company").val();
		var Responsibility=$("#Responsibility").val();
		var otherResponsibility = $("#otherResponsibility").val();
		var appntIDType=$("#field-9").val();//投保人证件类型
		var appntIDNo=$("#field-10").val();//投保人证件号码
		var appntSex=$("#field-11").val();//投保人性别
		var appntBirthday=$("#field-12").val();//投保人出生日期
		
		var appntIDStartDate=$("#field-14").val();//证件有效起期
		var appntIDEndDate=$("#field-15").val();//证件有效止期
		var appntCountry=$("#field-16").val();//国籍
		var appntOccupationCode=$("#field-17").val();//职业代码
		
		var appntMarry=$("#field-18").val();//婚姻状况
		var salary=$("#field-19").val();//工资
		var addressno=$("#field-20").val();//联系地址 省份
		var appntPostCode=$("#field-21").val();//邮编
		var appntPhone=$("#field-22").val();//移动电话
		var appntEmail=$("#field-23").val();//E-main
		var phone=$("#field-24").val();//家庭电话
		var phonenumber=$("#field-25").val();//家庭邮编
		var nationality=$("#field-27").val();//民族
		var smokeflag=$("#field-28").val();//是否吸烟
		var appntHigh=$("#field-29").val();//身高
		var appntWeight=$("#field-30").val();//体重
		var creditgrade=$("#field-32").val();//居民类型
		var rgtaddress=$("#field-33").val();//个人年收入
		var areaCall=$("#areaCall").val();//办公电话区号
		var call=$("#call").val();//办公电话
		
		var postalProvince=$("#loc_province-sub1").val();
		var postalCity=$("#loc_city-sub1").val();
		var postalArea=$("#loc_town-sub1").val();
		var postaladdress=$("#postaladdress").val();

		var homeProvince=$("#loc_province-sub2").val();
		var homeCity=$("#loc_city-sub2").val();
		var homeArea=$("#loc_town-sub2").val();
		var homeaddress=$("#homeaddress").val();
		
		$("#relationtoappnt").removeAttr("disabled");
		$("#LCInsuredname").val(appntName);
		$("#LCInsuredidno").val(appntIDNo);
		
		$("#LCInsuredidtype").select2("val",appntIDType);
		$("#LCInsuredsex").select2("val",appntSex);
		$("#LCInsuredbirthday").val(appntBirthday);
		$("#LCInsurednativeplace").select2("val",appntCountry);
		$("#insureidstartdate").val(appntIDStartDate);
		if($("#isLongItem").is(':checked')){ //如果是投保人证件有效止期是长期有效
			$("#insureidenddate").val("2099-01-01");  //显示9999-12-31
			$("#long_term").prop("checked",true);   //按钮选中
		}else{
			$("#insureidenddate").val(appntIDEndDate);//显示正常日期
			$("#long_term").removeAttr("checked");//去除选中按钮
		}
		
		$("#Lcinsuredcompany").val(company);
		$("#lcinsuredresponsibility").select2("val",Responsibility);//职位及工作内容
		$("#lcinsuredotherresponsibility").val(otherResponsibility);//其他
		
		$("#LCInsurede_mail").val(appntEmail);
		$("#LCInsuredzipcode").val(appntPostCode);//邮编
		$("#LCInsuredmarriage").select2("val",appntMarry);//婚姻状况
		$("#LCInsurednationality").select2("val",nationality);//民族
		
		$("#LCInsuredstature").val(appntHigh);//身高
		$("#LCInsuredavoirdupois").val(appntWeight);//体重
		$("#LCInsuredsmokeflag").select2("val",smokeflag);//是否吸烟
		$("#LCInsuredoccupationcode").select2("val",appntOccupationCode);//职业代码
		$("#LCInsuredmobile").val(appntPhone);//移动电话
		$("#LCInsuredareaCall").val(areaCall);//固定电话区号
		$("#LCInsuredcall").val(call);//固定电话
		$("#LCInsuredphone").val(phone);//家庭电话
		$("#annualincome").val(rgtaddress);//个人年收入
	    selectByCity1('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress", postalProvince , postalCity , postalArea,postaladdress) ;//前三个参数为三个下拉列表控件的ID，后三个参数可以不传值，如果不传值那么最后下拉列表的结果就是默认的每一个列表的第一个值，如果要设置默认值的话那么就需要对应这三个参数传递相应的省市区的值。
		$("#fwv-3b input").attr("disabled",true);
	    $("#fwv-3b select:not(:first)").attr("disabled",true);
	    $("#relationtoappnt").removeAttr("disabled");
	    
	}else{
		$("#fwv-3b input").removeAttr("disabled",true);
	    $("#fwv-3b select").removeAttr("disabled",true);
		$("#LCInsuredname").val("");
		$("#LCInsuredidno").val("");
		$("#LCInsuredidtype").select2("val","");
		$("#LCInsuredsex").select2("val","");
		$("#LCInsuredbirthday").val("");
		$("#LCInsurednativeplace").select2("val","");
		$("#insureidstartdate").val("");
		$("#insureidenddate").val("");
		$("#long_term").removeAttr("checked");
		$("#postalflag1").removeAttr("checked");
		$("#age").val("");
		$("#Lcinsuredcompany").val("");
		$("#lcinsuredresponsibility").select2("val","")
		$("#lcinsuredotherresponsibility").val("");//其他
		$("#LCInsurede_mail").val("");
		$("#LCInsuredzipcode").val("");//邮编
		$("#LCInsuredmarriage").select2("val","");//婚姻状况
		$("#LCInsurednationality").select2("val","");//民族
		$("#LCInsuredstature").val("");//身高
		$("#LCInsuredavoirdupois").val("");//体重
		$("#LCInsuredsmokeflag").select2("val","");//是否吸烟
		$("#LCInsuredhealth").select2("val","");//有无健康标识
		$("#LCInsuredoccupationcode").select2("val","");//职业代码
		$("#LCInsuredmobile").val("");//移动电话
		$("#LCInsuredareaCall").val("");//固定电话区号
		$("#LCInsuredcall").val("");//固定电话
		$("#LCInsuredphone").val("");//家庭电话
		$("#annualincome").val("");//个人年收入
		selectCity('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress");
		$("#LCInsuredhomeaddress").val("");//详细地址
	}

});

//受益人是否法定
$("#beneIsTrue").click(function(){
	var beneIsTrue=$("#beneIsTrue").val();
	if(beneIsTrue=="N"){
		$("#fwv-4 input[type='text'").attr("disabled",false);
		$("#fwv-4 select").attr("disabled",false);
	}else{
		$("#fwv-4 input[type='text'").val("");
		$("#fwv-4 select:not(:first)").select2("val","");
		$("#fwv-4 input[type='text'").attr("disabled",true);
		$("#fwv-4 select:not(:first)").attr("disabled",true);
	}
});

//投保人编辑
$("#fwv-2a").click(function(){
	$("#fwv-5s").val("0"); 
	$("#fwv-2b").removeClass("disabled");
	$("#fwv-2b .isCheckbox").removeAttr("disabled");
});
//税收编辑
$("#fwv-5a").click(function(){
	$("#fwv-3s").val("0"); 
	$("#fwv-5b").removeClass("disabled");
	if($("#statement").val()!='' && $("#statement").val()!='1'){  //如果税收---投保人声明不是第一个
		$("#fwv-5b .isCheckbox").removeAttr("disabled");
	}
});
//被保人编辑
$("#fwv-3a").click(function(){
	$("#fwv-4s").val("0"); 
	$("#fwv-3b").removeClass("disabled");
	if($("#relationtoappnt").val()!='' && $("#relationtoappnt").val()!='00'){  //如果被保人---投被保人关系不是本人
		$("#fwv-3b .isCheckbox").removeAttr("disabled");
	}
});
//受益人编辑
$("#fwv-4a").click(function(){
	$("#fwv-7s").val("0"); 
	$("#fwv-4b").removeClass("disabled");
});
	
//主险编辑
$("#fwv-7a").click(function(){
	$("#fwv-22s").val("0"); 
	$("#fwv-7b").removeClass("disabled");
	$("#fwv-7b .isCheckbox").removeAttr("disabled");
});
//附加险编辑
$("#fwv-22a").click(function(){
	$("#"+mytype+"s").val("0"); 
	$("#fwv-22b").removeClass("disabled");		
});
	
//情况告知编辑
$("#fwv-21a").click(function(){
	$("#fwv-6s").val("0"); 
	$("#fwv-21b").removeClass("disabled");
});
	
//情况告知编辑
$("#fwv-20a").click(function(){
	$("#fwv-6s").val("0"); 
	$("#fwv-20b").removeClass("disabled");		
});

//点击投保人，做投保单信息是否完整校验
$("#tabValidata").click(function(){
	return LccontValidata();
})
//点击下一页，做投保单信息是否完整校验
$("#nextValidata").click(function(){
	return LccontValidata();
});
//税收保存	
$("#save1").click(function(){
	
	if($("#statement").val()!='1'){
		$("#cnnativeheath_isscountry").removeAttr("disabled");
		$("#cnnativeheath_province").removeAttr("disabled");
		$("#cnnativeheath_city").removeAttr("disabled");
		$("#cnnativeheath_address").removeAttr("disabled");
	}
	
	 $("#proposalcontno5").val($("#field-2").val());
	var matter="保存税收";
	var sectionData1 = $("#fwv-5").serialize();
	
	var flag=revenueValidata();
		if(flag==false){
		$("#fwv-3s").val("0"); 
		return;
	}else{
		$("#fwv-3s").val("1"); 
	}
	$.ajax({
        url:path + '/newContEnter/saverevenue.do',  
        type: "POST",
        dataType: 'json',
        data: sectionData1+"&matter="+matter,
        success: function(data){
        	if(data.success==true){
        	  alert("保存成功");
        	$("#save3").removeAttr("disabled"); 
        	if(data.parm!=null){
        		$("#field-2").val(data.parm);
        	}
        	$("#fwv-5b").addClass("disabled");
        	if($("#statement").val()!='1'){  //如果税收---投保人声明不是第一个
        		$("#fwv-5b .isCheckbox").attr("disabled",true);
        	}
        	
        	}else{
        		alert(data.msg);
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(XMLHttpRequest.status=='408'){
        		alert("连接超时");
        	}else{
        		alert("save failed");
        	}
        }
    });  
	//保存成功之后，如果勾选了同投保人居住地址，不允许继续修改地址
	if($("#statement").val()!='1'){
		if($("#liveheath").val()=='1'){
			$("#cnnativeheath_isscountry").attr("disabled",true);
			$("#cnnativeheath_province").attr("disabled",true);
			$("#cnnativeheath_city").attr("disabled",true);
			$("#cnnativeheath_address").attr("disabled",true);
		}
	}
});


//告知录入----非投连险
$("#save15").click(function(){
	var flag=informValidata();
	if(flag==false){
		return;
	}
	
	$("#fwv-20 input").removeAttr("disabled");
	$("#select124").removeAttr("disabled");
	$("#select121").removeAttr("disabled");
	$("#select118").removeAttr("disabled");
	$("#select116").removeAttr("disabled");
	$("#select114").removeAttr("disabled");
	$("#select112").removeAttr("disabled");
	$("#select110").removeAttr("disabled");
	$("#select109").removeAttr("disabled");
	$("#select107").removeAttr("disabled");
	$("#select2").removeAttr("disabled");
	var sectionData = $("#fwv-20").serialize();

	$.ajax({
			 url:path + '/newContEnter/saveInputImpart.do',  
	         type: "POST",
	         dataType: 'json',
        	 data: sectionData+"&contNo1="+$("#contNo1").val(),
			 success: function(data){
				$("#fwv-20b").addClass("disabled");
				alert(data.msg);
				$("#save6").removeAttr("disabled"); 
				$("#save6").removeClass("btn btn-primaryis");
				$("#save6").addClass("btn btn-primary");
				$("#save8").removeAttr("disabled"); 
				$("#save8").removeClass("btn btn-primaryis");
				$("#save8").addClass("btn btn-primary");
				$("#select124").attr("disabled",true);
				$("#select121").attr("disabled",true);
				$("#select118").attr("disabled",true);
				$("#select116").attr("disabled",true);
				$("#select114").attr("disabled",true);
				$("#select112").attr("disabled",true);
				$("#select110").attr("disabled",true);
				$("#select109").attr("disabled",true);
				$("#select107").attr("disabled",true);
				$("#select2").attr("disabled",true);
				
				if($("#patient").val()==null || $("#patient").val()==""){ //患者
					$("#patient").attr("disabled",true);
				}
				if($("#etiology").val()==null || $("#etiology").val()==""){ //病因
					$("#etiology").attr("disabled",true);
				}
				if($("#PregnantTime").val()==null || $("#PregnantTime").val()==""){ //怀孕时长
					$("#PregnantTime").attr("disabled",true);
				}
				if($("#riskName").val()==null || $("#riskName").val()==""){ //险种名称
					$("#riskName").attr("disabled",true);
				}
				if($("#dated").val()==null || $("#dated").val()==""){ //拒保日期
					$("#dated").attr("disabled",true);
				}
				if($("#insuReason").val()==null || $("#insuReason").val()==""){ //拒保原因
					$("#insuReason").attr("disabled",true);
				}
				
			 }
		})
});

//投连险告知录入
$("#save16").click(function(){
	//非投连险告知录入
	var flag=informValidata1();
	if(flag==false){
		return;
	}
	$("#fwv-21 input").removeAttr("disabled");
	$("#select105").removeAttr("disabled");
	var sectionData = $("#fwv-21").serialize();
	$.ajax({
		 url:path + '/newContEnter/saveInputImpart.do',  
         type: "POST",
         dataType: 'json',
         data: sectionData,
		 success: function(data){
			 $("#fwv-21b").addClass("disabled");
			alert(data.msg);
			$("#save6").removeAttr("disabled"); 
			$("#save6").removeClass("btn btn-primaryis");
			$("#save6").addClass("btn btn-primary");
			
			$("#select105").attr("disabled",true);
			
			$("#save8").removeAttr("disabled"); 
			$("#save8").removeClass("btn btn-primaryis");
			$("#save8").addClass("btn btn-primary");
			
			if($("#riskName1").val()==null || $("#riskName1").val()==""){  //如果选择否，保存之后不能开放
				$("#riskName1").attr("disabled",true);
			}
			if($("#dated1").val()==null || $("#dated1").val()==""){
				$("#dated1").attr("disabled",true);
			}
			if($("#insuReason1").val()==null || $("#insuReason1").val()==""){
				$("#insuReason1").attr("disabled",true);
			}
		 }
	})
});


//附加险保存
$("#save0").click(function(){
	
	//附加险校验
	var flag=additionalRiskValidata();
	if(flag==false){
		$("#fwv-20s").val("0"); 
		$("#fwv-21s").val("0"); 
		return;
	}else{
		$("#fwv-20s").val("1"); 
		$("#fwv-21s").val("1"); 
	}
	$("#fwv-22b input").removeAttr("disabled");
	$("#fwv-22b select").removeAttr("disabled");
	$("#proposalContNo4").val($("#field-2").val());
	$("#hiddenRiskcode").val($("#riskcode").val());
	var sectionData = $("#fwv-22").serialize();
	$("#fwv-22b input").attr("disabled",true);
	$("#fwv-22b select").attr("disabled",true);
	$.ajax({
		url:path+ '/newContEnter/saveAdditionalRisk.do',
		type:"post",
		dataType:'json',
		data:sectionData,
		success:function(data){
			$("#fwv-22b").addClass("disabled");
			alert("保存成功");
		}
	});
});


//点击隐藏按钮，税收信息录入页面、录入告知做出改变
$("#displayBtn").click(function(){
	//年金领取方式显示
	$("#AnnuityOption").removeAttr("disabled");
	$("#NotificationInput").attr("href","#fwv-21");
	mytype="fwv-21";
	$("#div").show();
	$("#add").click();
});

//不同的险种加入不同的选项
$("#displayButton").click(function(){
	var select=document.getElementById("getForm1");
    var option=document.createElement("option");
	option.value="0";
	option.innerHTML="不适用";
	select.appendChild(option);	
	
	$("#getForm1").select2("val",0);
	$("#getForm1").attr("disabled","true");//年金领取方式
	
	var select=document.getElementById("DividendOption");
    var option=document.createElement("option");
	option.value="0";
	option.innerHTML="不适用";
	select.appendChild(option);	
	
	$("#DividendOption").select2("val",0);
	$("#DividendOption").attr("disabled","true");//红利给付方式
});

$("#displayButton1").click(function(){
	var select=document.getElementById("getForm1");
    var option=document.createElement("option");
	option.value="0";
	option.innerHTML="不适用";
	select.appendChild(option);	
	
	$("#getForm1").select2("val",0);
	$("#getForm1").attr("disabled","true");//年金领取方式
	
	var select=document.getElementById("DividendOption");
    var option=document.createElement("option");
	option.value="3";
	option.innerHTML="增额红利";
	select.appendChild(option);	
	
	$("#DividendOption").select2("val",3);
	$("#DividendOption").attr("disabled","true");//红利给付方式
	
	
});

$("#displayButton2").click(function(){
	$("#getForm1").select2("val",1);
	$("#getForm1").attr("disabled","true");//  年金领取方式
	
	var select=document.getElementById("DividendOption");
    var option=document.createElement("option");
	option.value="0";
	option.innerHTML="不适用";
	select.appendChild(option);	
	
	$("#DividendOption").select2("val",0);
	$("#DividendOption").attr("disabled","true");//红利给付方式
	
});


/*$("#hiddenDiv1").click(function(){
	$("#additionalRisk1").hide();
});
	
$("#showDiv1").click(function(){
	$("#additionalRisk1").show();
});
	
$("#hiddenDiv2").click(function(){
	$("#additionalRisk2").hide();
});
	
$("#showDiv2").click(function(){
	$("#additionalRisk2").show();
});*/


//受益人顺序	
$("#beneSort").change(function(){
	//如果受益人1的受益人顺序为空，那么移除掉所有原本选中的值
	if($("#beneSort").val()==""||$("#beneSort").val()==null){
		$("#benePart").val("");
		$("#beneName").val("");
		$("#beneSex").select2("val","");
		$("#beneBirth").val("");
		$("#beneIdCard").select2("val","");
		$("#beneIdNumber").val("");
		$("#relationtoinsured").select2("val","");
	}
});	 
		
$("#beneSort1").change(function(){
	if($("#beneSort1").val()==""||$("#beneSort1").val()==null){
		$("#benePart1").val("");
		$("#beneName1").val("");
		$("#beneSex1").select2("val","");
		$("#beneBirth1").val("");
		$("#beneIdCard1").select2("val","");
		$("#beneIdNumber1").val("");
		$("#relationtoinsured1").select2("val","");
	}
});	
	
$("#beneSort2").change(function(){
	if($("#beneSort2").val()==""||$("#beneSort2").val()==null){
		$("#benePart2").val("");
		$("#beneName2").val("");
		$("#beneSex2").select2("val","");
		$("#beneBirth2").val("");
		$("#beneIdCard2").select2("val","");
		$("#beneIdNumber2").val("");
		$("#relationtoinsured2").select2("val","");
	}
});	

//form局部提交2--投保人
$("#save2").click(function(){
	
	$('#field-6').removeAttr("disabled");
	$('#field-8').removeAttr("disabled");
	$('#field-9').removeAttr("disabled");
  	$("#field-10").removeAttr("disabled");
  	$("#field-11").removeAttr("disabled");
	$("#field-16").removeAttr("disabled");
	$("#field-12").removeAttr("disabled");
	$("#field-15").removeAttr("disabled");
	$("#isLongItem").removeAttr("disabled");
	
	$("#loc_province-sub2").removeAttr("disabled");
	$("#loc_city-sub2").removeAttr("disabled");
	$("#loc_town-sub2").removeAttr("disabled");
	$("#homeaddress").removeAttr("disabled");
	$("#field-25").removeAttr("disabled");
	
	var sectionData1 = $("#fwv-1").serialize();
	var sectionData = $("#fwv-2").serialize();
	
	$('#field-6').attr("disabled",true);
	$('#field-8').attr("disabled",true);
	$("#field-9").attr("disabled",true);
	$("#field-10").attr("disabled",true);
	$("#field-11").attr("disabled",true);
	$("#field-16").attr("disabled",true);
	$("#field-12").attr("disabled",true);
		 
	if($("#postalflag").is(":checked")){
		$("#loc_province-sub2").attr("disabled",true);
		$("#loc_city-sub2").attr("disabled",true);
		$("#loc_town-sub2").attr("disabled",true);
		$("#homeaddress").attr("disabled",true);
		$("#field-25").attr("disabled",true);
	}
	
	var matter="投保单和投保人信息保存";
	var flag=LcappntValidata();
	if(flag==false){
		$("#fwv-5s").val("0"); 
		return;
	}else{
		$("#fwv-5s").val("1"); 
	}
	$.ajax({
        url:path + '/newContEnter/saveNewCont.do',  
        type: "POST",
        dataType: 'json',
        data: sectionData1+"&"+sectionData+"&matter="+matter+"&riskcode="+riskCode,
        success: function(data){
        	if(data.success==true){
        		alert(data.msg);
        		$("#fwv-2b").addClass("disabled");
        		$("#fwv-2b .isCheckbox").attr('disabled',true);
              	$("#save3").removeAttr("disabled"); 
              	if(data.parm!=null){
              		$("#field-2").val(data.parm);
              		$("#contNo").val(data.parm);
              		$("#contNo1").val(data.parm);
              		$("#paymentInput").val(data.parm);
              	}
        	}else{
        		alert(data.msg);
        	}
        },
        error:function(){
        	alert("save failed");
        }
    });    
	var appName = $("#field-8").val();
	$("#AcctUserName").val(appName);
});

//form局部提交3--被保人
$("#save3").click(function(){

	var matter="被保人信息保存";
	$("#fwv-3b input").removeAttr("disabled");
	$("#fwv-3b select").removeAttr("disabled");
	var flag=LcinsuredValidata();
		if(flag==false){
		$("#fwv-4s").val("0"); 
		return;
	}else{
		$("#fwv-4s").val("1"); 
	}
	
	
	$("#proposalContNo1").val($("#field-2").val());
	var sectionData11 = $("#fwv-3").serialize();

	
	$.ajax({
        url:path + '/newContEnter/saveBBREnter.do',  
        type: "POST",
        dataType: 'json',
        data: sectionData11+"&matter="+matter,
        success: function(data){
        	alert(data.msg);
        	if(data.success==true){

            $("#fwv-3b").addClass("disabled");
        	$("#save4").removeAttr("disabled"); 
        	
        	if($("#relationtoappnt").val()=="00"){
        		$("#fwv-3b input").attr("disabled",true);
    		    $("#fwv-3b select:not(:first)").attr("disabled",true);
        	}else{
        		$("#fwv-3b .isCheckbox").attr("disabled",true);
        	}
        	console.log(data);
        	
        	}
        	
        },
        error:function(){
        	alert("save failed");
        }
    });       

});

//form局部提交4--受益人
$("#save4").click(function(){
	
	var matter="受益人信息保存";
	var flag=lcbnfValidata();

	if(flag==false){
		$("#fwv-7s").val("0"); 
		return;
	}else{
		$("#fwv-7s").val("1"); 
	}
	
	$("#proposalContNo2").val($("#field-2").val());

	
	var sectionData = $("#fwv-4").serialize();

	$.ajax({
        url:path + '/newContEnter/saveBeneEnterBean.do',  
        type: "POST",
        dataType: 'json',
        data: sectionData+"&matter="+matter,
        success: function(data){
        	
	        if(data.success==true){
        	$("#save5").removeAttr("disabled"); 
        	$("#fwv-4b").addClass("disabled");

        	alert(data.msg);
        	}
			
        },
        error:function(){
        	alert("save failed");
        }
    });       
});
//form局部提交5--主险和附加险 产品信息
$("#save5").click(function(){
	var flag=lcpolValidata();
	var matter="险种信息保存";
	if(flag==false){
		$("#fwv-22s").val("0"); 
		return;
	}else{
		$("#fwv-22s").val("1"); 
	}
	$("#proposalContNo3").removeAttr("disabled");
	$("#proposalContNo3").val($("#field-2").val());
	$("#fwv-7 input").removeAttr("disabled");
	$("#fwv-7 select").removeAttr("disabled");
	var sectionData = $("#fwv-7").serialize();
	
	$.ajax({
        url:path + '/newContEnter/saveLcpol.do',  
        type: "POST",
        dataType: 'json',
        data: sectionData+"&matter="+matter+"&proposalContNo="+$("#proposalContNo3").val(),
        success: function(data){
        	alert(data.msg);
        	if(data.success==true){
        	$("#notify").removeAttr("disabled"); 
        	$("#save6").removeAttr("disabled"); 
        	$("#save8").removeAttr("disabled"); 
        	$("#fwv-7b").addClass("disabled");
        	$("#fwv-7b .isCheckbox").attr("disabled",true);
        	console.log(data);
        	}
        	
        },
        error:function(){
        	alert("save failed");
        }
    });  
	
	//保存成功
	if($("#insuyears option:selected").text()=='不适用'){// 保险期间  数据回显的时候如果选中不适用，不能操作
		$("#insuyears").attr("disabled",true);
	}
	if($("#getForm1 option:selected").text()=='不适用'){// 年金领取方式  数据回显的时候如果选中不适用，不能操作
		$("#getForm1").attr("disabled",true);
	}
	if($("#payintv option:selected").text()=='不适用'){// 缴费方式  数据回显的时候如果选中不适用，不能操作
		$("#payintv").attr("disabled",true);
	}
	if($("#DividendOption option:selected").text()=='不适用'){// 红利给付方式  数据回显的时候如果选中不适用，不能操作
		$("#DividendOption").attr("disabled",true);
	}
	if($("#APLOption option:selected").text()=='不适用'){// 保险费逾期未付选择  数据回显的时候如果选中不适用，不能操作
		$("#APLOption").attr("disabled",true);
	}
	if($("#payendyears option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
		$("#payendyears").attr("disabled",true);
	}
});

//试算---投连险
$("#save8").click(function(){
	var proposalcontno=$("#field-2").val();
	var r=confirm("请确认是否要提交本投保单？请确保填写的投保信息正确无误产品说明书，投保提示书等投保所须资料已经完整提供，之后请打印投保单并请客户所有要求的文件上签字");
	var matter="试算保存";
	if (r==false)
	{
		$("#fwv-6s").val("0");
	   	return false;
	}else{
		
		$("#fwv-6s").val("1");
		shows();
	}
	$.ajax({
		type : "POST",
		url:path+"/TentativeController/tentativeSend.do",// 后台请求URL地址
		data : {"proposalcontno":proposalcontno,"matter":matter},
		dataType : "json",
		success : function(data) {
			closeds();
			if(data.success==true){
				
				if(data.parm=="1222"){  //1222为非实时申请，弹出确认框
					
					initNRealtime(); //初始化弹窗
					
					$("#modalBody").append('<span style="color: #4f4f4f;">此单需非实时核保，继续投保点击"转人工核保"，放弃投保点击"返回修改"，原因：'+data.msg+'</span>');
					$('#myModal3').attr('class', "modal show");
				}else{
					closeds();
					//试算成功  --可以打印投保单，扣款，延迟扣款
					$.ajax({  //试算成功后查询按钮状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
						data : {"proposalcontno":proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="1"){
										stateOfButton_1();
									}else if(data.parm=="2"){
										stateOfButton_2();
									}else if(data.parm=="3"){
										stateOfButton_3();
									}else if(data.parm=="4"){
										stateOfButton_4();
									}
								}else{ //数据不正确，不能进行操作
									stateOfButton_other();
									alert(data.msg);
								}
							}
						}
					});
					
					$.ajax({  //试算查询页面状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfPage.do', // 后台请求URL地址  
						data : {"proposalcontno":proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="P2"){
										stateOfPage();
									}
								}else{ //数据不正确，不能进行操作
									alert("页面跳转出错，"+data.msg);
								}
							}
						}
					});
	       			
					alert(data.msg);
				}
			}else{
				alert(data.msg);
			}
		},
        error:function(){
        	closeds();
        	alert("核保失败");
        }
	});
});

//试算---非投连
$("#save6").click(function() {
	var proposalcontno=$("#field-2").val();
	var r=confirm("请确认是否要提交本投保单？请确保填写的投保信息正确无误产品说明书，投保提示书等投保所须资料已经完整提供，之后请打印投保单并请客户所有要求的文件上签字");
	var matter="试算保存";
	if (r==false)
	{
		$("#fwv-6s").val("0");
	   	return false;
	}else{
		
		$("#fwv-6s").val("1");
		shows();
	}
	$.ajax({
		type : "POST",
		url:path+"/TentativeController/tentativeSend.do",// 后台请求URL地址
		data : {"proposalcontno":proposalcontno,"matter":matter},
		dataType : "json",
		success : function(data) {
			closeds();
			if(data.success==true){
				
				if(data.parm=="1222"){
					
					initNRealtime(); //初始化弹窗
					
					$("#modalBody").append('<span style="color: #4f4f4f;">此单需非实时核保，继续投保点击"转人工核保"，放弃投保点击"返回修改"，原因：'+data.msg+'</span>');
					$('#myModal3').attr('class', "modal show");
					
					}else{
					closeds();
					//试算成功  --可以打印投保单，扣款，延迟扣款
					$.ajax({  //试算成功后查询按钮状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
						data : {"proposalcontno":proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="1"){
										stateOfButton_1();
									}else if(data.parm=="2"){
										stateOfButton_2();
									}else if(data.parm=="3"){
										stateOfButton_3();
									}else if(data.parm=="4"){
										stateOfButton_4();
									}
								}else{ //数据不正确，不能进行操作
									stateOfButton_other();
									alert(data.msg);
								}
							}
						}
					});
					
					$.ajax({  //试算查询页面状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfPage.do', // 后台请求URL地址  
						data : {"proposalcontno":proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="P2"){
										stateOfPage();
									}
								}else{ //数据不正确，不能进行操作
									alert("页面跳转出错，"+data.msg);
								}
							}
						}
					});
					alert(data.msg);
				}
			}else{
				alert(data.msg);
			}
		},
        error:function(){
        	closeds();
        	alert("核保失败");
        }
	});
});

//扣款
$("#save7").click(function() {
	var r=confirm("核保成功，请确认投保单已打印,客户同意扣款");
	if (r==false)
	{
	   return false;
	}else{
		shows();
	}

	var proposalcontno=$("#field-2").val();
	$.ajax({
		type : "POST",
		url:path+'/debitcontroller/debitSend.do',// 后台请求URL地址  
		data : {"proposalcontno":proposalcontno},
		dataType : "json",
		success : function(data) {
			closeds();
			
			$.ajax({  //扣款成功后查询按钮状态
				type : "POST",
				url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
				data : {"proposalcontno":proposalcontno},
				dataType : "json",
				success:function(data) {
					if(data!=null){
						if(data.success==true){ //数据正确，返回按钮状态
							if(data.parm=="1"){
								stateOfButton_1();
							}else if(data.parm=="2"){
								stateOfButton_2();
							}else if(data.parm=="3"){
								stateOfButton_3();
							}else if(data.parm=="4"){
								stateOfButton_4();
							}
						}else{ //数据不正确，不能进行操作
							stateOfButton_other();
							alert(data.msg);
						}
					}
				},
				error:function(){
					closeds();
				}
			});
			
		alert(data.msg);
		},
        error:function(){
        	closeds();
        	alert("扣款失败");
        }
	});
});


$("#save10").click(function(){
	if(confirm("您确定要打印投保单号："+$("#field-2").val().trim()+"?")){
		$.ajax({
			url:path + '/newContEnter/selectFromLccont.do',
			type:"POST",
			data:{"proposalcontno":$("#field-2").val().trim()},
			success:function(data){
				$.ajax({
					url:path + '/newContEnter/selectRiskTypeByTransNo.do',
					type:"POST",
					data:{"transno":data.transno},
					success:function(data){
						var url = null ;
						if(data.risktype=="01"){
							url = "../../contprint/jsp/printPL.jsp?contNo="+
							$("#field-2").val().trim()
								+"&AgentCom="+$("#field-1").val();
						}else{
							url = "../../contprint/jsp/printPL2.jsp?contNo="+
							$("#field-2").val().trim()
								+"&AgentCom="+$("#field-1").val();
						}
						window.open(url);
					}
				});
			},
			error:function(data){
				alert("查询投保单信息失败");
			}
		})
	}
});

//税收居民信息页面，点击第一个所有的控件属性为只读
$("#statement").change(function(){
	if($("#statement").find("option:selected").val()=="1"){
		$(".disabletDiv input").attr("disabled","true");
		$(".disabletDiv select").attr("disabled","true");
		$(".disabletDiv textarea").attr("disabled","true");
		$(".disabletDiv button").attr("disabled","true");
		
		$(".disabletDiv input").val("");
		$(".disabletDiv select").select2("val","");
		$("#reason2desc").val("");
		$(".disabletDiv textarea").hide();
		$("#tiveheath").removeAttr("checked"); //现居地址同投保人居住地址
		$("#liveheath").removeAttr("checked"); //出生地址同投保人居住地址
	}else{
		
		//税收居民信息页面，点击第2、3个所有的控件属性可写
		$(".disabletDiv input").removeAttr("disabled");
		$(".disabletDiv select").removeAttr("disabled");
		$(".disabletDiv textarea").removeAttr("disabled");
		$(".disabletDiv button").removeAttr("disabled");
		
		 $.ajax({
			 url:path + '/newContEnter/selectldcustomer.do',  
	         type: "POST",
	         data:{"cifid":grpcontno},
			 success: function(data){
				 var str = data.fullname.split(" ");
				 $("#firstname").val(str[0]);
				 $("#lastname").val(str[1]+" "+str[2]);
			 }
		 });
	}
});

/**
 * 告知录入页面选择是的时候允许输入特定的input
 *
 * */
$("#select1").change(function(){
	if($("#select1").find("option:selected").val()=="Y"){
		$("#insuredArea").removeAttr("disabled");
		$("#insuredTime").removeAttr("disabled");
	}else{
		$("#insuredArea").val("");
		$("#insuredTime").val("");
		$("#insuredArea").attr("disabled","true");
		$("#insuredTime").attr("disabled","true");
	}
	
});
$("#select2").change(function(){
	if($("#select2").find("option:selected").val()=="Y"){
		$("#AppArea").removeAttr("disabled");
		$("#AppTime").removeAttr("disabled");
	}else{
		$("#AppArea").val("");
		$("#AppTime").val("");
		$("#AppArea").attr("disabled","true");
		$("#AppTime").attr("disabled","true");
	}
});
$("#select3").change(function(){
	if($("#select3").find("option:selected").val()=="Y"){
		$("#patient").removeAttr("disabled");
		$("#etiology").removeAttr("disabled");
	}else{
		$("#patient").val("");
		$("#etiology").val("");
		$("#patient").attr("disabled","true");
		$("#etiology").attr("disabled","true");
	}
});

$("#isPregnant").change(function(){
	if($("#isPregnant").find("option:selected").val()=="Y"){
		$("#PregnantTime").removeAttr("disabled");
	}else{
		$("#PregnantTime").val("");
		$("#PregnantTime").attr("disabled","true");
	}
});

$("#select4").change(function(){
	if($("#select4").find("option:selected").val()=="Y"){
		$("#companyName").removeAttr("disabled");
		$("#insuDate").removeAttr("disabled");
		$("#lifeInsu").removeAttr("disabled");
		$("#accidentInsu").removeAttr("disabled");
		$("#CriticalillnessInsu").removeAttr("disabled");
	}else{
		$("#companyName").val("");
		$("#insuDate").val("");
		$("#lifeInsu").val("");
		$("#accidentInsu").val("");
		$("#CriticalillnessInsu").val("");
		$("#companyName").attr("disabled","true");
		$("#insuDate").attr("disabled","true");
		$("#lifeInsu").attr("disabled","true");
		$("#accidentInsu").attr("disabled","true");
		$("#CriticalillnessInsu").attr("disabled","true");
	}
});

$("#select5").change(function(){
	if($("#select5").find("option:selected").val()=="Y"){
		$("#riskName").removeAttr("disabled");
		$("#dated").removeAttr("disabled");
		$("#insuReason").removeAttr("disabled");
	}else{
		$("#riskName").val("");
		$("#dated").val("");
		$("#insuReason").val("");
		$("#riskName").attr("disabled","true");
		$("#dated").attr("disabled","true");
		$("#insuReason").attr("disabled","true");
	}
});

$("#select6").change(function(){
	if($("#select6").find("option:selected").val()=="Y"){
		$("#insuredArea1").removeAttr("disabled");
		$("#insuredTime1").removeAttr("disabled");
	}else{
		$("#insuredArea1").val("");
		$("#insuredTime1").val("");
		$("#insuredArea1").attr("disabled","true");
		$("#insuredTime1").attr("disabled","true");
	}
	
});

$("#select7").change(function(){
	if($("#select7").find("option:selected").val()=="Y"){
		$("#riskName1").removeAttr("disabled");
		$("#dated1").removeAttr("disabled");
		$("#insuReason1").removeAttr("disabled");
	}else{
		$("#riskName1").val("");
		$("#dated1").val("");
		$("#insuReason1").val("");
		$("#riskName1").attr("disabled","true");
		$("#dated1").attr("disabled","true");
		$("#insuReason1").attr("disabled","true");
	}
});



//点击：账户持有人未能取得纳税人识别号  文本域显示出来
$("#reason").change(function(){
	if($("#reason").val()=="2"){
		$("#reason2desc").css("display","block");
	}
	if($("#reason").val()=="1"){
		$("#reason2desc").css("display","none");
	}
});

$(function(){
	//被保人长期有效设置默认值9999-12-31
	$("#long_term").click(function(){
		if($("#long_term").is(":checked")==true){ //勾选
			$("#insureidenddate").val("2099-01-01");
			$("#insureidenddate").attr("disabled",true);
		}else{ //取消
			$("#insureidenddate").val("");
			$("#insureidenddate").removeAttr("disabled");
		}
	});
	
	//投保人长期有效
	$("#isLongItem").click(function(){
		if($("#isLongItem").is(":checked")==true){ //勾选
			$("#field-15").val("2099-01-01");
			$("#field-15").attr("disabled",true);
		}else{
			$("#field-15").val("");
			$("#field-15").removeAttr("disabled");
		}
	});
	
	//同居住地址
	$("#postalflag").click(function(){
		
		if($("#postalflag").is(":checked")==true){
			var postalProvince=$("#loc_province-sub1").val();
			var postalCity=$("#loc_city-sub1").val();
			var postalArea=$("#loc_town-sub1").val();
			var postaladdress=$("#postaladdress").val();
			var appntPostCode=$("#field-21").val();//邮编
			selectByCity1('loc_province-sub2','loc_city-sub2','loc_town-sub2',"homeaddress", postalProvince , postalCity , postalArea,postaladdress) ;
		    $("#field-25").val(appntPostCode);//家庭邮编
		    
		    $("#loc_province-sub2").attr("disabled",true);
		    $("#loc_city-sub2").attr("disabled",true);
		    $("#loc_town-sub2").attr("disabled",true);
		    $("#homeaddress").attr("disabled",true);
		    $("#field-25").attr("disabled",true);
		}else{
		
			selectCity('loc_province-sub2','loc_city-sub2','loc_town-sub2',"homeaddress");
			$("#homeaddress").val("");
			$("#field-25").val("")
			
			$("#loc_province-sub2").removeAttr("disabled");
			$("#loc_city-sub2").removeAttr("disabled");
			$("#loc_town-sub2").removeAttr("disabled");
			$("#homeaddress").removeAttr("disabled");
			$("#field-25").removeAttr("disabled");
		}
	
	});
	//被保人同投保人居住地址
	$("#postalflag1").click(function(){
		
		if($("#postalflag1").is(":checked")==true){
			var postalProvince=$("#loc_province-sub1").val();
			var postalCity=$("#loc_city-sub1").val();
			var postalArea=$("#loc_town-sub1").val();
			var postaladdress=$("#postaladdress").val();
			var appntPostCode=$("#field-21").val();//邮编
			selectByCity1('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress", postalProvince , postalCity , postalArea,postaladdress) ;
			$("#LCInsuredpostaladdress").val(postaladdress)
			$("#LCInsuredzipcode").val(appntPostCode);
			
			$("#loc_province-sub3").attr("disabled",true);
		    $("#loc_city-sub3").attr("disabled",true);
		    $("#loc_town-sub3").attr("disabled",true);
		    $("#LCInsuredpostaladdress").attr("disabled",true);
		    $("#LCInsuredzipcode").attr("disabled",true);
		}else{
			selectCity('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress");
			$("#LCInsuredpostaladdress").val("");
			$("#LCInsuredzipcode").val("");
			
			$("#loc_province-sub3").removeAttr("disabled");
			$("#loc_city-sub3").removeAttr("disabled");
			$("#loc_town-sub3").removeAttr("disabled");
			$("#LCInsuredpostaladdress").removeAttr("disabled");
			$("#LCInsuredzipcode").removeAttr("disabled");
		}
	
	});
	
	//税收页面   点击同投保人居住地址
	
	$("#liveheath").click(function(){
		if($("#liveheath").is(":checked")==true){
			var cnnativeheath_isscountry=$("#loc_province-sub1").val();
			var cnnativeheath_province=$("#loc_city-sub1").val();
			var cnnativeheath_city=$("#loc_town-sub1").val();
			var cnnativeheath_address=$("#postaladdress").val();
			selectByCity1('cnnativeheath_isscountry','cnnativeheath_province','cnnativeheath_city','cnnativeheath_address',cnnativeheath_isscountry,cnnativeheath_province,cnnativeheath_city,cnnativeheath_address);
		
			$("#cnnativeheath_isscountry").attr("disabled",true);
		    $("#cnnativeheath_province").attr("disabled",true);
		    $("#cnnativeheath_city").attr("disabled",true);
		    $("#cnnativeheath_address").attr("disabled",true);
		}else{
			selectCity('cnnativeheath_isscountry','cnnativeheath_province','cnnativeheath_city','cnnativeheath_address');	
		
			$("#cnnativeheath_isscountry").removeAttr("disabled");
			$("#cnnativeheath_province").removeAttr("disabled");
			$("#cnnativeheath_city").removeAttr("disabled");
			$("#cnnativeheath_address").removeAttr("disabled");
		}
	});
	
	
	$("#postaladdress").blur(function(){
		
		var postalProvince=$("#loc_province-sub1").val();
		var postalCity=$("#loc_city-sub1").val();
		var postalArea=$("#loc_town-sub1").val();
		var postaladdress=$("#postaladdress").val();
		
		var homeProvince=$("#loc_province-sub2").val();
		var homeCity=$("#loc_city-sub2").val();
		var homeArea=$("#loc_town-sub2").val();
		var homeaddress=$("#homeaddress").val();
		var el = document.getElementById("postalflag");
		if(postalProvince==homeProvince&&postalCity==homeCity&&postalArea==homeArea&&postaladdress==homeaddress){
			el.checked=true;
			
		}else{
			el.checked=false;
			
		}
	});
	
	$("#homeaddress").blur(function(){
		
		var postalProvince=$("#loc_province-sub1").val();
		var postalCity=$("#loc_city-sub1").val();
		var postalArea=$("#loc_town-sub1").val();
		var postaladdress=$("#postaladdress").val();
		
		var homeProvince=$("#loc_province-sub2").val();
		var homeCity=$("#loc_city-sub2").val();
		var homeArea=$("#loc_town-sub2").val();
		var homeaddress=$("#homeaddress").val();
		var el = document.getElementById("postalflag");
		if(postalProvince==homeProvince&&postalCity==homeCity&&postalArea==homeArea&&postaladdress==homeaddress){
			el.checked=true;
			
		}else{
			el.checked=false;
			
		}
	});
	
	$("#field-21").blur(function(){
		
		var postalProvince=$("#loc_province-sub1").val();
		var postalCity=$("#loc_city-sub1").val();
		var postalArea=$("#loc_town-sub1").val();
		var postaladdress=$("#postaladdress").val();
		var appntPostCode=$("#field-21").val();//邮编
		var homeProvince=$("#loc_province-sub2").val();
		var homeCity=$("#loc_city-sub2").val();
		var homeArea=$("#loc_town-sub2").val();
		var homeaddress=$("#homeaddress").val();
		var phonenumber=$("#field-25").val();//家庭邮编
		var el = document.getElementById("postalflag");
		if(postalProvince==homeProvince&&postalCity==homeCity&&postalArea==homeArea&&postaladdress==homeaddress&&appntPostCode==phonenumber){
			el.checked=true;
			
		}else{
			el.checked=false;
			
		}
	});
	
	
	$("#field-25").blur(function(){
		
		var postalProvince=$("#loc_province-sub1").val();
		var postalCity=$("#loc_city-sub1").val();
		var postalArea=$("#loc_town-sub1").val();
		var postaladdress=$("#postaladdress").val();
		var appntPostCode=$("#field-21").val();//邮编
		var homeProvince=$("#loc_province-sub2").val();
		var homeCity=$("#loc_city-sub2").val();
		var homeArea=$("#loc_town-sub2").val();
		var homeaddress=$("#homeaddress").val();
		var phonenumber=$("#field-25").val();//家庭邮编
		var el = document.getElementById("postalflag");
		if(postalProvince==homeProvince&&postalCity==homeCity&&postalArea==homeArea&&postaladdress==homeaddress&&appntPostCode==phonenumber){
			
			el.checked=true;
			
		}else{
			el.checked=false;
			
		}
	});
	//延迟扣款
	$("#save9").click(function(){
		var matter="延迟扣款";
		var DelayedDate=$("#DelayedDate").val();
		
		if(DelayedDate==""||DelayedDate==""){
			alert("请输入延迟扣款时间");
			return false;
		}
		var date=new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
		
	
		if(Datecompare1(date,DelayedDate)==false){
			alert("延迟扣款时间不得晚于今天");
			return false;
		}
		var r=confirm("核保成功,请确认投保单已打印");
		if (r==false)
		{
		   return false;
		}else{
		
		
		var contno=$("#field-2").val();
		
		$.ajax({
				 url:path + '/newContEnter/Delayed.do',  
		         type: "POST",
		         data:{"DelayedDate":DelayedDate,"proposalcontno":contno,"matter":matter},
				 success: function(data){
				 if(data.success){
					
					$.ajax({  //延迟扣款成功后查询按钮状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
						data : {"proposalcontno":contno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="1"){
										stateOfButton_1();
									}else if(data.parm=="2"){
										stateOfButton_2();
									}else if(data.parm=="3"){
										stateOfButton_3();
									}else if(data.parm=="4"){
										stateOfButton_4();
									}
								}else{ //数据不正确，不能进行操作
									stateOfButton_other();
									alert(data.msg);
								}
							}
						}
					});
					$("#DelayedDate").attr("disabled",true);
					alert("投保单号为："+data.parm+","+data.msg);
				}else{
					alert(data.msg);
				}	 
				
			},
			error:function(){
            	alert("延迟扣款失败");
            }
		})	
		}	
	});

	
});
/**
 * 如果没有传过来保险产品代码，选中保险产品
 */
function selectLmrisk(){
	$("#div").hide();
	$("#insuyears option:not(:first)").remove();
	$("#insuyears").select2("val","");
		
	$("#prem").val("");
	$("#amnt").val("");
	$("#mult").val("");
	
	$("#payendyears option:not(:first)").remove();
	$("#payendyears").select2("val","");
	
	$("#payintv option:not(:first)").remove();
	$("#payintv").select2("val","");
	
	$("#getform option:not(:first)").remove();
	$("#getform").select2("val","");
	$("#getage").val("");
	var riskcode=$("#riskcode").val();
	
	if(riskcode!=null&&riskcode!=""){
		//获取保险期间
			$.ajax({
				 url:path + '/newContEnter/searchRiskTypeBean.do',  
		         type: "POST",
		         data:{"riskcode":riskcode},
				 success: function(data){
						if(data.risktype=='01'){
							$("#div").show();
							$("#add").click();
					}
				 }
			});
			$.ajax({
					url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
					type: "POST",
					data:{"riskcode":riskcode,"paramstype":"insuyear"},
					success: function(data){
						for(var i=0;i<data.length;i++){
							var select=document.getElementById("insuyears");
							var option=document.createElement("option");
							option.value=data[i].paramscode;
							option.innerHTML=data[i].paramsname;
							select.appendChild(option);	
						}
						
						if(data.length==1){
							$("#insuyears").select2("val",data[0].paramscode);
						}
					}
			});			
			//获取缴费期间
			$.ajax({
				url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
				type: "POST",
				data:{"riskcode":riskcode,"paramstype":"payendyear"},
				success: function(data){
					for(var i=0;i<data.length;i++){
						var select=document.getElementById("payendyears");
						var option=document.createElement("option");
						option.value=data[i].paramscode;
						option.innerHTML=data[i].paramsname;
						select.appendChild(option);	
					}
					
					if(data.length==1){
						$("#payendyears").select2("val",data[0].paramscode);
					}
				 }
			});			
				
			//获取缴费方式
			$.ajax({
				url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
				type: "POST",
				data:{"riskcode":riskcode,"paramstype":"payintv"},
				async: true,
				success: function(data){
					for(var i=0;i<data.length;i++){
						var select=document.getElementById("payintv");
						var option=document.createElement("option");
						option.value=data[i].paramscode.replace(/^\s+|\s+$/g, '');
						option.innerHTML=data[i].paramsname;
						select.appendChild(option);	
					}
					if(data.length==1){
						$("#payintv").select2("val",data[0].paramscode);
					}
				}
			});			
	}
}

function selectRiskcode(riskCode){
				//获取保险期间
				$.ajax({
							 url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
						         type: "POST",
						         data:{"riskcode":riskCode,"paramstype":"insuyear"},
						         async: false,
								 success: function(data){
								 for(var i=0;i<data.length;i++){
									var select=document.getElementById("insuyears");
								    var option=document.createElement("option");
									option.value=data[i].paramscode;
									option.innerHTML=data[i].paramsname;
									select.appendChild(option);	
									
								 	 }
								 }
				});			
				//获取缴费期间
				$.ajax({
							 url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
						     type: "POST",
						     async: false,
						     data:{"riskcode":riskCode,"paramstype":"payendyear"},
							 success: function(data){
								 for(var i=0;i<data.length;i++){
									var select=document.getElementById("payendyears");
								    var option=document.createElement("option");
									option.value=data[i].paramscode;
									option.innerHTML=data[i].paramsname;
									select.appendChild(option);	
									
								 }
							}
				});			
				//获取缴费方式
				$.ajax({
							 url:path + '/LmriskparamsdefaController/selectByLmriskparamsdefaVo.do',  
						     type: "POST",
						     async: false,
						     data:{"riskcode":riskCode,"paramstype":"payintv"},
							 success: function(data){
								 for(var i=0;i<data.length;i++){
									var select=document.getElementById("payintv");
								    var option=document.createElement("option");
									option.value=data[i].paramscode;
									option.innerHTML=data[i].paramsname;
									select.appendChild(option);	
									
								 }
							 }
				});			
			$.ajax({
				 url:path + '/newContEnter/selectlmrisk.do',  
		         type: "POST",
		         async: false,
		         data:{"riskcode":riskCode},
				 success: function(data){
				 if(data.length==0){
				 		$("#riskcode1").find("option").remove();
						$("#riskcode1").select2("val","");
						 //reportTable.style.display="none";
				 }else{
				
				 	for(var i=0;i<data.length;i++){
					var select=document.getElementById("riskcode1");
				    var option=document.createElement("option");
					option.value=data[i].riskCode;
					option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
					select.appendChild(option);	
				 	}
				 }	 
			}
		});	
}

function selectInfo(transno){   //投保单复制

	//根据是否投连险改变页面样式
	$.ajax({
				url:path + '/newContEnter/selectRiskTypeByTransNo.do',
				type:"POST",
				async: false,
				data:{"transno":transno},
				success:function(data){
					riskTypeflag=data.risktype;
					//如果产品为这三种，年金领取方式不适用，红利给付方式不适用
					if(data.riskcode=="@MA" || data.riskcode=="@JN" || data.riskcode=="@JZ"){
						$("#displayButton").click();
					}
					//险种码为 @SD
					if(data.riskcode=='@SD'){
						$("#displayButton1").click();
					}
					
					if(data.riskcode=='@SC'){
						$("#displayButton2").click();
					}
					
					//查询附加险
					$.ajax({
						url:path + '/newContEnter/selectlmrisk.do',  
						type: "POST",
						//async: false,
						data:{"riskcode":data.riskcode},
						success: function(data){
							//如果主险不存在附加险，附加险页面全部为不可操作----置灰
							if(data.length<1){
								$("#fwv-22b input").attr("disabled","true");
								$("#fwv-22b select").attr("disabled","true");
							}else{
								//附加险1绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode1");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
								//附加险2绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode2");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
								//附加险3绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode3");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
							}
						}
					});
					
					if(data.risktype=="01"){
						$("#displayBtn").click();
						//如果是投连险，设置投资账户
						$.ajax({
							url:path + '/newContEnter/selectLcaccountinfo.do',
							type:"POST",
							data:{"transno":transno},
							success:function(data){
								for(var i=0;i<data.length;i++){
									if(data[i].bak5==1){
										$("#a0").select2("val",data[i].accno)
										$("#b0").val(data[i].accrate);
									}
									
									if(data[i].bak5==2){
										$("#a1").select2("val",data[i].accno)
										$("#b1").val(data[i].accrate);
									}
									
									if(data[i].bak5==3){
										$("#a2").select2("val",data[i].accno)
										$("#b2").val(data[i].accrate);
									}
									
									if(data[i].bak5==4){
										$("#a3").select2("val",data[i].accno)
										$("#b3").val(data[i].accrate);
									}
									
									if(data[i].bak5==5){
										$("#a4").select2("val",data[i].accno)
										$("#b4").val(data[i].accrate);
									}
								}
							}
						});
						
						//投连险告知
						$.ajax({
							url:path + '/newContEnter/selectImpart.do',
							type:"POST",
							data:{"transno":transno},
							success:function(data){
								$("#select6").select2("val",data[0].insuredyesorno);
								$("#insuredArea1").val(data[0].insuredyesornoimpart);
								$("#insuredTime1").val(data[1].insuredyesornoimpart);
								
								$("#select100").select2("val",data[2].insuredyesorno);
								
								$("#select101").select2("val",data[3].insuredyesorno);
								
								$("#select102").select2("val",data[4].insuredyesorno);
								
								$("#select7").select2("val",data[5].insuredyesorno);
								$("#riskName1").val(data[5].insuredyesornoimpart);
								
								$("#dated1").val(data[6].insuredyesornoimpart);
								
								$("#insuReason1").val(data[7].insuredyesornoimpart);
								
								if($("#riskName1").val()!=null && $("#riskName1").val()!=""){
									$("#riskName1").removeAttr("disabled");
								}
								
								if($("#dated1").val()!=null && $("#dated1").val()!=""){
									$("#dated1").removeAttr("disabled");
								}
								
								if($("#insuReason1").val()!=null && $("#insuReason1").val()!=""){
									$("#insuReason1").removeAttr("disabled");
								}
								
								$("#select103").select2("val",data[8].insuredyesorno);
								
								$("#select104").select2("val",data[9].insuredyesorno);
								
								$("#select105").select2("val",data[9].owneryesorno);
								
							}
						})
						
					}else{
						//非投连险告知
						$.ajax({
							url:path + '/newContEnter/selectImpart.do',
							type:"POST",
							data:{"transno":transno},
							success:function(data){
								$("#select1").select2("val",data[0].insuredyesorno);
								$("#select2").select2("val",data[0].owneryesorno);

								$("#insuredArea").val(data[0].insuredyesornoimpart);
								$("#AppArea").val(data[0].ownerimpart);
								
								$("#insuredTime").val(data[1].insuredyesornoimpart);
								$("#AppTime").val(data[1].ownerimpart);
								
								$("#select106").select2("val",data[2].insuredyesorno);
								$("#select107").select2("val",data[2].owneryesorno);
								
								$("#select108").select2("val",data[3].insuredyesorno);
								$("#select109").select2("val",data[3].owneryesorno);
								
								$("#select3").select2("val",data[4].insuredyesorno);
								$("#select110").select2("val",data[4].owneryesorno);
								$("#patient").val(data[4].insuredyesornoimpart);
								
								$("#etiology").val(data[5].insuredyesornoimpart);
								
								$("#select111").select2("val",data[6].insuredyesorno);
								$("#select112").select2("val",data[6].owneryesorno);
								
								$("#select113").select2("val",data[7].insuredyesorno);
								$("#select114").select2("val",data[7].owneryesorno);
								
								$("#select115").select2("val",data[8].insuredyesorno);
								$("#select116").select2("val",data[8].owneryesorno);
								
								$("#select117").select2("val",data[9].insuredyesorno);
								$("#select118").select2("val",data[9].owneryesorno);
								$("#isPregnant").select2("val",data[9].insuredyesornoimpart);
								
								$("#PregnantTime").val(data[10].insuredyesornoimpart);
								
								$("#select119").select2("val",data[11].insuredyesorno);
								
								$("#select120").select2("val",data[12].insuredyesorno);
								
								$("#select4").select2("val",data[13].insuredyesorno);
								$("#companyName").val(data[13].insuredyesornoimpart);
								
								$("#insuDate").val(data[14].insuredyesornoimpart);
								
								$("#lifeInsu").val(data[15].insuredyesornoimpart);
								
								$("#accidentInsu").val(data[16].insuredyesornoimpart);
								
								$("#CriticalillnessInsu").val(data[17].insuredyesornoimpart);
								
								
								$("#select5").select2("val",data[18].insuredyesorno);
								$("#select121").select2("val",data[18].owneryesorno);
								$("#riskName").val(data[18].insuredyesornoimpart);
								
								$("#dated").val(data[19].insuredyesornoimpart);
								
								$("#insuReason").val(data[20].insuredyesornoimpart);
								
								$("#select122").select2("val",data[21].insuredyesorno);
								$("#diseases").val(data[21].insuredyesornoimpart);
								
								$("#hospital").val(data[22].insuredyesornoimpart);
								
								$("#TimeOfIllness").val(data[23].insuredyesornoimpart);
								
								$("#condition").val(data[24].insuredyesornoimpart);
								
								$("#select123").select2("val",data[25].insuredyesorno);
								$("#select124").select2("val",data[25].owneryesorno);
								
								if($("#patient").val()!=null && $("#patient").val()!=""){ //患者
									$("#patient").removeAttr("disabled");
								}
								if($("#etiology").val()!=null && $("#etiology").val()!=""){ //病因
									$("#etiology").removeAttr("disabled");
								}
								if($("#PregnantTime").val()!=null && $("#PregnantTime").val()!=""){ //怀孕时长
									$("#PregnantTime").removeAttr("disabled");
								}
								if($("#riskName").val()!=null && $("#riskName").val()!=""){ //险种名称
									$("#riskName").removeAttr("disabled");
								}
								if($("#dated").val()!=null && $("#dated").val()!=""){ //拒保日期
									$("#dated").removeAttr("disabled");
								}
								if($("#insuReason").val()!=null && $("#insuReason").val()!=""){ //拒保原因
									$("#insuReason").removeAttr("disabled");
								}
							}
						})
					}
				}
			});
	
				//投保单信息
				 $.ajax({
				 url:path + '/newContEnter/selectBylccont.do',  
		         type: "POST",
		         async: false,
		         data:{"transno":transno},
				 success: function(data){
					 
					 if(data.investmentStartDateFlag==1){  //投资起始日期
						 document.getElementsByName("InvestmentStartDateFlag")[0].checked="checked";
					 }else if(data.investmentStartDateFlag==2){
						 document.getElementsByName("InvestmentStartDateFlag")[1].checked="checked";
					 }
				 $.ajax({
					 url:path + '/newContEnter/searchRiskTypeBean.do',  
			         type: "POST",
			         data:{"riskcode":data.riskcode},
					 success: function(data){
							var select=document.getElementById("riskcode");
						    var option=document.createElement("option");
							option.value=data.riskcode;
							option.innerHTML=data.riskcode+"-"+data.riskname;
							select.appendChild(option);
							if(data.risktype=='00'){
								$("#div").show();
								var AccNo=document.getElementsByName("AccNo");
				      		    var AccRate=document.getElementsByName("AccRate");
								$.ajax({
									 url:path + '/newContEnter/selectlcaccountInfo.do',  
									  type: "POST",
				         			 data:{"transno":transno},
									  success: function(data){
									  	if(data.length!=0){
									  		for (var i = 0; i < data.length; i++) {
									  			addLcaccountinfo();
									  			AccRate[num-1].value=data[i].accrate;
									  			AccNo[num-1].value=data[i].accno;
									  		}
									  	}
									  	$(AccNo[0]).select2("val",data[1].accno);
									  }
								});	
							}
					 }
				});	 
				 $("#riskcode").val(data.riskcode);//保险产品
				 
				 /**
				  * 根据险种码绑定产品的基本信息
				  * 
				  * */
				 selectRiskcode(data.riskcode);
				 
				 $("#save3").removeAttr("disabled"); 	
				 $("#save2").removeAttr("disabled"); 
				 $("#grpcontno").val(data.grpcontno); //CIFID
				 $("#field-1").select2("val",data.insurancecom);//保险公司
				 $("#field-2").val(data.proposalcontno);//投保单号
				 $("#contNo").val(data.proposalcontno);//投保单号
				 $("#contNo1").val(data.proposalcontno);//投保单号
				 $("#field-6").val(dateToString(data.polapplydate));//投保单日期
				 $("#field-7").select2("val",data.getpolmode);//保险公司 
				 $("#AcctUserName").val(data.acctUserName);//保费交付页面---户名
				 $("#AcctType").val(data.acctType);//保费交付页面---账户类型
				 $("#newpaymode").select2("val",data.newpaymode)//保费交付页面---首期交费方式
				 $("#paylocation").select2("val",data.paylocation);//保费交付页面---续期交费方式
				 $("#depositBank").val(data.depositBank);//保费交付页面---开户银行
				 $("#premiumBudget").val(data.premiumBudget);//保费预算
				 //账户查询
				  $.ajax({
				   url:path + '/newContEnter/selectAccNo.do',  
			       type: "POST",
			       data:{"cifid":data.grpcontno},
			       async: false,
				   success: function(data){
					 for(var i=0;i<data.length;i++){
						//如果客户账户是联名账户加（联）
						if(data[i].accountstatus=='Y'){
							var select=document.getElementById("newbankaccno");
						    var option=document.createElement("option");
						    var str = "（联）"+data[i].accountnumber;
							option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
							option.innerHTML=str;
							select.appendChild(option);	
						}else{
							//非联名账户加（个）
							var select=document.getElementById("newbankaccno");
						    var option=document.createElement("option");
							var str = "（个）"+data[i].accountnumber;
							option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
							option.innerHTML=str;
							select.appendChild(option);	
						}
						
					  }
					 }
				})
				 $("#newbankaccno").select2("val",data.bankaccno);//客户账户
				 
				//另一持有人信息回显
				 $.ajax({
					url:path + '/newContEnter/selectLdcustomeraccount.do',  
					type: "POST",
					data:{"cifid":data.grpcontno,"bankaccno":data.bankaccno},
				    success: function(data){
				    		if(data != null){
				    			$("#AnotherHolderName").val(data.anotherHolderName);
				    			$("#AnotherHolderIdType").select2("val",data.anotherHolderIdType);
				    			$("#AnotherHolderIdNO").val(data.anotherHolderIdNo);
				    			$("#accountbalance").val(data.accountbalance);//账户余额
				    		}
					} 
				});
				  
				 
				
				 //查询ldcustomer,数据回显goalType;
				 $.ajax({
					 url:path + '/newContEnter/selectldcustomer.do',  
			         type: "POST",
			         data:{"cifid":data.grpcontno},
					 success: function(data){
						 $("#GoalType").select2("val",data.goaltype); //需求类型
						 
						 if(data.totalincome=='N'){   //家庭年收入-------个人年收入在复制的时候复制到了lcappent，家庭年收入直接去ldcustomer
								$("#field-19").val("");
							}else{
								$("#field-19").val(data.totalincome);
							}
					 }
			      });
				 
				 $.ajax({  //扣款成功后查询按钮状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
						data : {"proposalcontno":data.proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="1"){
										stateOfButton_1();
									}else if(data.parm=="2"){
										stateOfButton_2();
									}else if(data.parm=="3"){
										stateOfButton_3();
									}else if(data.parm=="4"){
										stateOfButton_4();
									}
								}else{ //数据不正确，不能进行操作
									stateOfButton_other();
									alert(data.msg);
								}
							}
						}
					});
				 
				 $.ajax({  //继续录入查询页面状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfPage.do', // 后台请求URL地址  
						data : {"proposalcontno":data.proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="P2"){
										stateOfPage();
									}
								}else{ //数据不正确，不能进行操作
									alert("页面跳转出错，"+data.msg);
								}
							}
						}
					});
	}
});	//----------------------------------投保单信息结束---------------------------------------- 
		      
		       //投保人信息
		       $.ajax({
				 url:path + '/newContEnter/selectBylcappnt.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 	
					$("#field-8").val(data.appntname);//投保人姓名
					$("#field-9").select2("val",data.idtype);//证件类型
					$("#field-10").val(data.idno);//证件号码
					$("#field-11").select2("val",data.appntsex);//性别
					$("#field-12").val(data.appntbirthdayToStr);//出生日期
					$("#field-14").val(dateToString(data.appntstartdate));//证件有效起期
					if(dateToString(data.appntenddate)!='2099-01-01'){
						$("#field-15").val(dateToString(data.appntenddate));//证件有效止期
					}else{
						$("#isLongItem").prop("checked",'true');
						$("#field-15").val("2099-01-01");
					}
					$("#field-16").select2("val",data.nativeplace);//国籍
					$("#field-17").select2("val",data.occupationcode);//职业代码
					$("#AppHeight").val(data.stature);//身高
					$("#AppWeight").val(data.avoirdupois);//体重
					$("#field-32").select2("val",data.creditgrade);//居民类型
					
					if(data.rgtaddress=='N'){  //个人年收入
						$("#field-33").val("");
					}else{
						$("#field-33").val(data.rgtaddress);
					}
					
					$("#company").val(data.company);//工作单位及名称
					$("#Responsibility").select2("val",data.responsibility);//职位及工作内容
					$("#otherResponsibility").val(data.otherresponsibility);//其他
					$("#field-8").attr("disabled",true);
					$("#field-9").attr("disabled",true);
      				$("#field-10").attr("disabled",true);
      				$("#field-11").attr("disabled",true);
      				$("#field-16").attr("disabled",true);
			      }
		       });
		         
		       //投保人地址
		         $.ajax({
				 url:path + '/newContEnter/selectBylcaddress0.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
					$("#field-21").val(data.zipcode);//邮寄编码
					$("#field-22").val(data.mobile);//移动电话
					$("#field-23").val(data.email);//e_main
					$("#field-24").val(data.phone);//电话phone
					$("#field-25").val(data.homezipcode);//homezipcode家庭邮编
					var homephone=data.homephone.split("-");
					$("#areaCall").val(homephone[0]);//区号
					$("#call").val(homephone[1]);//电话
					var postaladdress=data.postaladdress.split("&");
					selectByCity1('loc_province-sub1','loc_city-sub1','loc_town-sub1',"postaladdress", postaladdress[0] , postaladdress[1] , postaladdress[2],postaladdress[3]) ;
					var homeaddress=data.homeaddress.split("&");
					selectByCity1('loc_province-sub2','loc_city-sub2','loc_town-sub2',"homeaddress", homeaddress[0] , homeaddress[1] , homeaddress[2],homeaddress[3]) ;
					$("#homeaddress").val(homeaddress[3]);
					if(data.postalflag=="3"){
						var el = document.getElementById("postalflag");
						el.checked=true;
					}
			      }
		       })
		     	
		       //主险种信息查询
			         $.ajax({
					 url:path + '/newContEnter/selectLcpol.do',  
			         type: "POST",
			         data:{"transno":transno,"grpcontno":"1"},
					 success: function(data){
						if(data.proposalno!=null&&data.proposalno!=""){
							
							$("#riskcode").select2("val",data.riskcode);//保险公司 
							$("#prem").val(data.prem);//保费
							$("#amnt").val(data.amnt);//保额
							$("#mult").val(data.mult);//份数
							$("#insuyears").select2("val",data.insuyear);//保险期间
							
							$("#payendyears").select2("val",data.payendyear);//缴费期间
							if($("#payendyears option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
								$("#payendyears").attr("disabled",true);
							}
							
							$("#payintv").select2("val",data.payintv);//缴费方式
							if($("#payintv option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
								$("#payintv").attr("disabled",true);
							}
							
							$("#getage").select2("val",data.getyear);//年金/约定领取年龄
							if($("#getage option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
								$("#getage").attr("disabled",true);
							}
							
							if(data.getform==0){ //如果年金领取方式是不适用，动态添加option
								var select=document.getElementById("getForm1");
							    var option=document.createElement("option");
								option.value="0";
								option.innerHTML="不适用";
								select.appendChild(option);	
							}
							$("#getForm1").select2("val",data.getform);//年金领取方式
							
							
							if($("#getForm1 option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
								$("#getForm1").attr("disabled",true);
							}
							
							if(data.bonusgetmode==0){
								var select=document.getElementById("DividendOption");
							    var option=document.createElement("option");
								option.value="0";
								option.innerHTML="不适用";
								select.appendChild(option);	
							}
							
							if(data.bonusgetmode==3){
								var select=document.getElementById("DividendOption");
							    var option=document.createElement("option");
								option.value="3";
								option.innerHTML="增额红利";
								select.appendChild(option);	
							}
							
							$("#DividendOption").select2("val",data.bonusgetmode);//红利给付方式
							if($("#DividendOption option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
								$("#DividendOption").attr("disabled",true);
							}
							if($("#DividendOption option:selected").text()=='增额红利'){//数据回显的时候如果选中增额红利，不能操作
								$("#DividendOption").attr("disabled",true);
							}
							
							$("#APLOption").select2("val",data.aploption);//保险费逾期未付选择
						}
				      }
			       });
		       
		       
		       //被保人信息
		       $.ajax({
				 url:path + '/newContEnter/selectBylcinsured.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 	if(data.transno!=null){
				 		if(data.relationtoappnt=="00"){
				 			$("#fwv-3b input").attr("disabled",true);
						    $("#fwv-3b select").attr("disabled",true);
						    $("#relationtoappnt").removeAttr("disabled");
				 		}
				 		$("#relationtoappnt").select2("val",data.relationtoappnt);//与投保人的关系
				 		$("#LCInsuredname").val(data.lcinsuredname);//投保人姓名
				 		$("#LCInsuredidtype").select2("val",data.lcinsuredidtype);//证件类型
				 		$("#LCInsuredidno").val(data.lcinsuredidno);//证件号码
				 		$("#LCInsuredsex").select2("val",data.lcinsuredsex);//性别
				 		$("#LCInsuredbirthday").val(data.lcinsuredbirthdayToStr);//出生日期
				 		$("#LCInsurednativeplace").select2("val",data.lcinsurednativeplace);//国籍
				 		if(dateToString(data.insureidenddate)!='2099-01-01'){
				 			$("#long_term").removeAttr("checked");
				 			$("#insureidenddate").removeAttr("disabled");
				 		}else{
				 			$("#long_term").prop("checked",'true');//回显如果不是9999-12-31，不勾选长期有效
				 			$("#insureidenddate").attr("disabled",true);
				 		}
				 		$("#insureidenddate").val(dateToString(data.insureidenddate));//证件有效止期
				 		$("#InsuHight").val(data.stature);//身高
				 		$("#InsuWeight").val(data.avoirdupois);//体重
				 		$("#annualincome").val(data.rgtaddress)//个人年收入
				 		$("#LCInsuredoccupationcode").select2("val",data.lcinsuredroccupationcode);//职业代码	
				 		$("#Lcinsuredcompany").val(data.lcinsuredcompany);//工作单位及名称
				 		$("#lcinsuredresponsibility").select2("val",data.lcinsuredresponsibility);//职位
				 		$("#lcinsuredotherresponsibility").val(data.lcinsuredotherresponsibility);//其他
				 		
						 //被保人人地址
				         $.ajax({
						 url:path + '/newContEnter/selectBylcaddress1.do',  
				         type: "POST",
				         data:{"transno":transno},
						 success: function(data){
							$("#LCInsuredzipcode").val(data.zipcode);//邮寄编码
							$("#LCInsuredmobile").val(data.mobile);//移动电话
					 		$("#LCInsuredphone").val(data.phone);//家庭电话

							$("#LCInsurede_mail").val(data.email);//e_main
							
							var homephone=data.homephone.split("-");
							$("#LCInsuredareaCall").val(homephone[0]);//区号
							$("#LCInsuredcall").val(homephone[1]);//电话
							var postaladdress=data.postaladdress.split("&");
							selectByCity1('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress", postaladdress[0] , postaladdress[1] , postaladdress[2],postaladdress[3]) ;
					      }
				       })
				 	}
			      }
		       })
		       
				$.ajax({
				 url:path + '/newContEnter/selectrevenue.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 	var reason = data.reason1;
				 	var reason2desc = data.reason2desc;
				 	var statement=data.statement;
				 	$("#statement").select2("val",statement);
				 	//如果居民类型是2或者3，form下面的输入框可以输入
				 	if($("#statement").val()==3 || $("#statement").val()==2){
				 		$("#fwv-5 input").removeAttr("disabled");
				 		$("#fwv-5 select").removeAttr("disabled");
				 		$("#fwv-5 textarea").removeAttr("disabled");
				 	}
				 	$("#firstname").val(data.firstname);
				 	$("#lastname").val(data.lastname);
				 	if(data.liveheath==1){
				 		$("input:checkbox[value='1']").eq(1).attr('checked','true');
				 	}
				 	var livingaddress=data.livingaddress.split("&"); 
				 	$("#living_isscountry").val(livingaddress[0]=="null"?"":livingaddress[0]);
				 	$("#living_province").val(livingaddress[1]=="null"?"":livingaddress[1]);
				 	$("#living_city").val(livingaddress[2]=="null"?"":livingaddress[2]);
				 	$("#living_address").val(livingaddress[3]=="null"?"":livingaddress[3]);
				 	if(data.tiveheath==1){
				 		$("input:checkbox[value='1']").eq(2).attr('checked','true');
				 	}
				 	
				 	var cnnativeheath =data.cnnativeheath.split("&");
				 	selectByCity1('cnnativeheath_isscountry','cnnativeheath_province','cnnativeheath_city',"cnnativeheath_address", cnnativeheath[0] , cnnativeheath[1] , cnnativeheath[2],cnnativeheath[3]=="null"?"":cnnativeheath[3]) ;
				 	
				 	var ennativeheath =data.ennativeheath.split("&");
				 	$("#ennativeheath_isscountry").val(ennativeheath[0]=="null"?"":ennativeheath[0]);
				 	$("#ennativeheath_province").val(ennativeheath[1]=="null"?"":ennativeheath[1]);
				 	$("#ennativeheath_city").val(ennativeheath[2]=="null"?"":ennativeheath[2]);
				 	$("#ennativeheath_address").val(ennativeheath[3]=="null"?"":ennativeheath[3]);
	  		$.ajax({
				 url:path + '/newContEnter/selectTaxrevenue.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 for (var index = 0; index < data.length; index++) {
					 if(index==0){
						 $("#residentnumber0").val(data[index].residentnumber);
						 $("#residentcountry0").val(data[index].residentcountry);
					 }else if(index==1){
						 $("#residentnumber1").val(data[index].residentnumber);
						 $("#residentcountry1").val(data[index].residentcountry);
					 }else{
						 $("#residentnumber2").val(data[index].residentnumber);
						 $("#residentcountry2").val(data[index].residentcountry);
					 }
				 }
				 
				 $("#reason").select2("val",reason);
				 $("#reason").attr('checked','true');
				 if($("#reason").val()=="2"){
					 $("#reason2desc").css("display","block");
					 $("#marginbottom15").nextAll().find("textarea").attr("disabled","true");
				 }
				 $("#reason2desc").val(reason2desc);
				 	
				 }
				}); 	
				 }
				 
				});
		       var beneSort=document.getElementsByName("beneSort");
		       var benePart=document.getElementsByName("benePart");
		       var beneName=document.getElementsByName("beneName");
		       var beneBirth=document.getElementsByName("beneBirth");
		       var beneIdNumber=document.getElementsByName("beneIdNumber");
		       var beneSex=document.getElementsByName("beneSex");
		       var beneIdCard=document.getElementsByName("beneIdCard");
		       var relationtoinsured=document.getElementsByName("relationtoinsured");
		       //受益人1
		         $.ajax({
				 url:path + '/newContEnter/selectlcbnf.do',  
		         type: "POST",
		         data:{"transno":transno,"bnfgrade":"1"},
				 success: function(data){
					if(data.getform==1){//法定
					
						$("#beneIsTrue").select2("val","Y");
						$("#fwv-4 input[type='text'").attr("disabled",true);
						$("#fwv-4 select:not(:first)").attr("disabled",true);
					}else if(data.getform==2){
						
						$("#fwv-4 input[type='text'").attr("disabled",false);
						$("#fwv-4 select").attr("disabled",false);
						
						$("#save5").removeAttr("disabled");//保存被保人
						$("#beneIsTrue").select2("val","N");
						$(beneSort[0]).select2("val",data.bnfno);
						benePart[0].value=data.bnflot;//受益人比例
						beneName[0].value=data.name;//姓名
						$(beneSex[0]).select2("val",data.sex);//性别
						
						
						
						beneBirth[0].value=data.birthdayToStr;//出生日期
						$(beneIdCard[0]).select2("val",data.idtype);//证件类型
						beneIdNumber[0].value=data.idno;//证件号码
						$(relationtoinsured[0]).select2("val",data.relationtoinsured);//关系
						
						//受益人2
				         $.ajax({
						 url:path + '/newContEnter/selectlcbnf.do',  
				         type: "POST",
				         data:{"transno":transno,"bnfgrade":"2"},
						 success: function(data){
						 		if(data.getform!=null&&data.getform!=""){
						 			//addbenefer();
						 			$(beneSort[1]).select2("val",data.bnfno);
									benePart[1].value=data.bnflot;//受益人比例
									beneName[1].value=data.name;//姓名
									$(beneSex[1]).select2("val",data.sex);//性别
									beneBirth[1].value=data.birthdayToStr;//出生日期
									$(beneIdCard[1]).select2("val",data.idtype);//证件类型
									beneIdNumber[1].value=data.idno;//证件号码
									$(relationtoinsured[1]).select2("val",data.relationtoinsured);//关系
						
						 		}
						 		
						 		//受益人3
				         $.ajax({
						 url:path + '/newContEnter/selectlcbnf.do',  
				         type: "POST",
				         data:{"transno":transno,"bnfgrade":"3"},
						 success: function(data){
						 		if(data.getform!=null&&data.getform!=""){
						 			//addbenefer();
						 			$(beneSort[2]).select2("val",data.bnfno);
									benePart[2].value=data.bnflot;//受益人比例
									beneName[2].value=data.name;//姓名
									$(beneSex[2]).select2("val",data.sex);//性别
									beneBirth[2].value=data.birthdayToStr;//出生日期
									$(beneIdCard[2]).select2("val",data.idtype);//证件类型
									beneIdNumber[2].value=data.idno;//证件号码
									$(relationtoinsured[2]).select2("val",data.relationtoinsured);//关系
						
						 		}
					      }
				       })
						 			
					      }
				       })
					}
			      }
		       })  
}

function selectCont(transno){
	//根据是否投连险改变页面样式
	$.ajax({
				url:path + '/newContEnter/selectRiskTypeByTransNo.do',
				type:"POST",
				data:{"transno":transno},
				async: false,
				success:function(data){
					riskTypeflag=data.risktype;
					//如果产品为这三种，年金领取方式不适用，红利给付方式不适用
					if(data.riskcode=="@MA" || data.riskcode=="@JN" || data.riskcode=="@JZ"){
						$("#displayButton").click();
					}
					//险种码为 @SD
					if(data.riskcode=='@SD'){
						$("#displayButton1").click();
					}
					
					if(data.riskcode=='@SC'){
						$("#displayButton2").click();
					}
					
					//查询附加险
					$.ajax({
						url:path + '/newContEnter/selectlmrisk.do',  
						type: "POST",
						//async: false,
						data:{"riskcode":data.riskcode},
						success: function(data){
							//如果主险不存在附加险，附加险页面全部为不可操作----置灰
							if(data.length<1){
								$("#fwv-22b input").attr("disabled","true");
								$("#fwv-22b select").attr("disabled","true");
							}else{
								//附加险1绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode1");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
								//附加险2绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode2");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
								//附加险3绑定数据
								for(var i=0;i<data.length;i++){
									var select=document.getElementById("riskcode3");
									var option=document.createElement("option");
									option.value=data[i].riskCode;
									option.innerHTML=data[i].riskCode+"-"+data[i].riskName;
									select.appendChild(option);	
								}
							}
						}
					});
					
					if(data.risktype=="01"){
						$("#displayBtn").click();
						
						//如果是投连险，设置投资账户
						$.ajax({
							url:path + '/newContEnter/selectLcaccountinfo.do',
							type:"POST",
							//async: false,
							data:{"transno":transno},
							success:function(data){
								if(data.length!=0){
									$("#fwv-21s").val("1");
									$("#fwv-20s").val("1");
									$("#fwv-6s").val("1");
									$("#fwv-21b").addClass("disabled");
									$("#fwv-20b").addClass("disabled");
								}
								for(var i=0;i<data.length;i++){
									if(data[i].bak5==1){
										$("#a0").select2("val",data[i].accno)
										$("#b0").val(data[i].accrate);
									}
									
									if(data[i].bak5==2){
										$("#a1").select2("val",data[i].accno)
										$("#b1").val(data[i].accrate);
									}
									
									if(data[i].bak5==3){
										$("#a2").select2("val",data[i].accno)
										$("#b2").val(data[i].accrate);
									}
									
									if(data[i].bak5==4){
										$("#a3").select2("val",data[i].accno)
										$("#b3").val(data[i].accrate);
									}
									
									if(data[i].bak5==5){
										$("#a4").select2("val",data[i].accno)
										$("#b4").val(data[i].accrate);
									}
								}
							}
						});
						
						//投连险告知
						$.ajax({
							url:path + '/newContEnter/selectImpart.do',
							type:"POST",
							data:{"transno":transno},
							success:function(data){
								if(data.length!=0){
									$("#fwv-21s").val("1");
									$("#fwv-20s").val("1");
									$("#fwv-6s").val("1");
									$("#fwv-21b").addClass("disabled");
									$("#fwv-20b").addClass("disabled");
								}
								$("#select6").select2("val",data[0].insuredyesorno);
								$("#insuredArea1").val(data[0].insuredyesornoimpart);
								$("#insuredTime1").val(data[1].insuredyesornoimpart);
								
								$("#select100").select2("val",data[2].insuredyesorno);
								
								$("#select101").select2("val",data[3].insuredyesorno);
								
								$("#select102").select2("val",data[4].insuredyesorno);
								
								$("#select7").select2("val",data[5].insuredyesorno);
								
								$("#riskName1").val(data[5].insuredyesornoimpart);
								
								$("#dated1").val(data[6].insuredyesornoimpart);
								
								$("#insuReason1").val(data[7].insuredyesornoimpart);
								
								if($("#riskName1").val()!=null && $("#riskName1").val()!=""){
									$("#riskName1").removeAttr("disabled");
								}
								
								if($("#dated1").val()!=null && $("#dated1").val()!=""){
									$("#dated1").removeAttr("disabled");
								}
								
								if($("#insuReason1").val()!=null && $("#insuReason1").val()!=""){
									$("#insuReason1").removeAttr("disabled");
								}
								
								$("#select103").select2("val",data[8].insuredyesorno);
								
								$("#select104").select2("val",data[9].insuredyesorno);
								
								$("#select105").select2("val",data[9].owneryesorno);
								
							}
						})
						
					}else{
						//非投连险告知
						$.ajax({
							url:path + '/newContEnter/selectImpart.do',
							type:"POST",
							data:{"transno":transno},
							success:function(data){
								if(data.length!=0){
									$("#fwv-21s").val("1");
									$("#fwv-20s").val("1");
									$("#fwv-6s").val("1");
									$("#fwv-21b").addClass("disabled");
									$("#fwv-20b").addClass("disabled");
								}
								
								$("#select1").select2("val",data[0].insuredyesorno);
								$("#select2").select2("val",data[0].owneryesorno);

								$("#insuredArea").val(data[0].insuredyesornoimpart);
								$("#AppArea").val(data[0].ownerimpart);
								
								$("#insuredTime").val(data[1].insuredyesornoimpart);
								$("#AppTime").val(data[1].ownerimpart);
								
								$("#select106").select2("val",data[2].insuredyesorno);
								$("#select107").select2("val",data[2].owneryesorno);
								
								$("#select108").select2("val",data[3].insuredyesorno);
								$("#select109").select2("val",data[3].owneryesorno);
								
								$("#select3").select2("val",data[4].insuredyesorno);
								$("#select110").select2("val",data[4].owneryesorno);
								$("#patient").val(data[4].insuredyesornoimpart);
								$("#etiology").val(data[5].insuredyesornoimpart);
								
								$("#select111").select2("val",data[6].insuredyesorno);
								$("#select112").select2("val",data[6].owneryesorno);
								
								$("#select113").select2("val",data[7].insuredyesorno);
								$("#select114").select2("val",data[7].owneryesorno);
								
								$("#select115").select2("val",data[8].insuredyesorno);
								$("#select116").select2("val",data[8].owneryesorno);
								
								$("#select117").select2("val",data[9].insuredyesorno);
								$("#select118").select2("val",data[9].owneryesorno);
								$("#isPregnant").select2("val",data[9].insuredyesornoimpart);
								
								$("#PregnantTime").val(data[10].insuredyesornoimpart);
								
								$("#select119").select2("val",data[11].insuredyesorno);
								
								$("#select120").select2("val",data[12].insuredyesorno);
								
								$("#select4").select2("val",data[13].insuredyesorno);
								$("#companyName").val(data[13].insuredyesornoimpart);
								
								$("#insuDate").val(data[14].insuredyesornoimpart);
								
								$("#lifeInsu").val(data[15].insuredyesornoimpart);
								
								$("#accidentInsu").val(data[16].insuredyesornoimpart);
								
								$("#CriticalillnessInsu").val(data[17].insuredyesornoimpart);
								
								
								$("#select5").select2("val",data[18].insuredyesorno);
								$("#select121").select2("val",data[18].owneryesorno);
								$("#riskName").val(data[18].insuredyesornoimpart);
								
								$("#dated").val(data[19].insuredyesornoimpart);
								
								$("#insuReason").val(data[20].insuredyesornoimpart);
								
								$("#select122").select2("val",data[21].insuredyesorno);
								$("#diseases").val(data[21].insuredyesornoimpart);
								
								$("#hospital").val(data[22].insuredyesornoimpart);
								
								$("#TimeOfIllness").val(data[23].insuredyesornoimpart);
								
								$("#condition").val(data[24].insuredyesornoimpart);
								
								$("#select123").select2("val",data[25].insuredyesorno);
								$("#select124").select2("val",data[25].owneryesorno);
								
								
								if($("#patient").val()!=null && $("#patient").val()!=""){ //患者
									$("#patient").removeAttr("disabled");
								}
								if($("#etiology").val()!=null && $("#etiology").val()!=""){ //病因
									$("#etiology").removeAttr("disabled");
								}
								if($("#PregnantTime").val()!=null && $("#PregnantTime").val()!=""){ //怀孕时长
									$("#PregnantTime").removeAttr("disabled");
								}
								if($("#riskName").val()!=null && $("#riskName").val()!=""){ //险种名称
									$("#riskName").removeAttr("disabled");
								}
								if($("#dated").val()!=null && $("#dated").val()!=""){ //拒保日期
									$("#dated").removeAttr("disabled");
								}
								if($("#insuReason").val()!=null && $("#insuReason").val()!=""){ //拒保原因
									$("#insuReason").removeAttr("disabled");
								}
								
							}
						})
					}
				}
			});
	
		
				//投保单信息
				$.ajax({
				 url:path + '/newContEnter/selectBylccont.do',  
		         type: "POST",
		         async: false,
		         data:{"transno":transno},
				 success: function(data){
				if(data.investmentStartDateFlag==1){
					document.getElementsByName("InvestmentStartDateFlag")[0].checked="checked";
				}else if(data.investmentStartDateFlag==2){
					document.getElementsByName("InvestmentStartDateFlag")[1].checked="checked";
				};	 
				 
				 //投保单有riskcode，因此可以先将标签绑定
				 $.ajax({
					url:path + '/newContEnter/searchRiskTypeBean.do',  
				    type: "POST",
				    data:{"riskcode":data.riskcode},
				    async: false,
					success: function(data){
						var select=document.getElementById("riskcode");
						var option=document.createElement("option");
						option.value=data.riskcode;
						option.innerHTML=data.riskcode+"-"+data.riskname;
						select.appendChild(option);
						if(data.risktype=='00'){
							$("#div").show();
							var AccNo=document.getElementsByName("AccNo");
				      		var AccRate=document.getElementsByName("AccRate");
							$.ajax({
								url:path + '/newContEnter/selectlcaccountInfo.do',  
								type: "POST",
				         		data:{"transno":transno},
								success: function(data){
									if(data.length!=0){
									   for (var i = 0; i < data.length; i++) {
									  		addLcaccountinfo();
									  		AccRate[num-1].value=data[i].accrate;
									  		AccNo[num-1].value=data[i].accno;
									  	}
									 }
									 $(AccNo[0]).select2("val",data[1].accno);
								}
							});	
						}
					}
				});	 
					 
				 $("#riskcode").val(data.riskcode);//保险产品 
				 /**
				  * 根据险种码绑定产品的基本信息
				  * 
				  * */
				 selectRiskcode(data.riskcode);
				 
				 $("#fwv-2b").addClass("disabled");
				 $("#fwv-2b .isCheckbox").attr("disabled",true);
				 $("#fwv-5s").val("1");
			 	 $("#fwv-5b").addClass("disabled");
			 	 
				 $("#save3").removeAttr("disabled"); 	
				 $("#save2").removeAttr("disabled");
				 $("#grpcontno").val(data.grpcontno); //CIFID
				 $("#field-1").select2("val",data.insurancecom);//保险公司
				 $("#field-2").val(data.proposalcontno);//投保单号
				 $("#contNo").val(data.proposalcontno);//投保单号
				 $("#contNo1").val(data.proposalcontno);//投保单号
				 $("#field-6").val(dateToString(data.polapplydate));//投保单日期
				 $("#field-7").select2("val",data.getpolmode);//保险公司 
				 $("#AcctUserName").val(data.acctUserName);//保费交付页面---户名
				 $("#AcctType").val(data.acctType);//保费交付页面---账户类型
				 $("#newpaymode").select2("val",data.newpaymode)//保费交付页面---首期交费方式
				 $("#paylocation").select2("val",data.paylocation);//保费交付页面---续期交费方式
				 $("#depositBank").val(data.depositBank);//保费交付页面---开户银行
				 $("#premiumBudget").val(data.premiumBudget);//保费预算
				 if(""!=data.delayeddebit&&null!=data.delayeddebit){
					 $("#DelayedDate").val(dateToString(data.delayeddebit));//延迟扣款时间---如果有就回显
					 $("#DelayedDate").attr("disabled",true);
				 };
				 //账户查询
				  $.ajax({
				   url:path + '/newContEnter/selectAccNo.do',  
			       type: "POST",
			       data:{"cifid":data.grpcontno},
			       async: false,
					 success: function(data){
					  for(var i=0;i<data.length;i++){
						//如果客户账户是联名账户加（联）
						if(data[i].accountstatus=='Y'){
							var select=document.getElementById("newbankaccno");
						    var option=document.createElement("option");
						    var str = "（联）"+data[i].accountnumber;
							option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
							option.innerHTML=str;
							select.appendChild(option);	
						}else{
							//非联名账户加（个）
							var select=document.getElementById("newbankaccno");
						    var option=document.createElement("option");
							var str = "（个）"+data[i].accountnumber;
							option.value=data[i].accountnumber.replace(/^\s+|\s+$/g, '');
							option.innerHTML=str;
							select.appendChild(option);	
						}
						
					  }
					 }
				})
				 
				 $("#newbankaccno").select2("val",data.bankaccno);//客户账户
				  
				 //另一持有人信息回显
				 $.ajax({
					 url:path + '/newContEnter/selectLdcustomeraccount.do',  
				       type: "POST",
				       data:{"cifid":data.grpcontno,"bankaccno":data.bankaccno},
					   success: function(data){
							 if(data != null){
								 $("#AnotherHolderName").val(data.anotherHolderName);
								 $("#AnotherHolderIdType").select2("val",data.anotherHolderIdType);
								 $("#AnotherHolderIdNO").val(data.anotherHolderIdNo);
							 }
					   } 
				 }); 
				
				 //查询ldcustomer,数据回显goalType;
				 $.ajax({
					 url:path + '/newContEnter/selectldcustomer.do',  
			         type: "POST",
			         data:{"cifid":data.grpcontno},
					 success: function(data){
						 $("#GoalType").select2("val",data.goaltype);
					 }
			      });
				 
				 $.ajax({  //扣款成功后查询按钮状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
						data : {"proposalcontno":data.proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="1"){
										stateOfButton_1();
									}else if(data.parm=="2"){
										stateOfButton_2();
									}else if(data.parm=="3"){
										stateOfButton_3();
									}else if(data.parm=="4"){
										stateOfButton_4();
									}
								}else{ //数据不正确，不能进行操作
									stateOfButton_other();
									alert(data.msg);
								}
							}
						}
					});
				 
				 $.ajax({  //继续录入查询页面状态
						type : "POST",
						url:path + '/newContEnter/selectStateOfPage.do', // 后台请求URL地址  
						data : {"proposalcontno":data.proposalcontno},
						dataType : "json",
						success:function(data) {
							if(data!=null){
								if(data.success==true){ //数据正确，返回按钮状态
									if(data.parm=="P2"){
										stateOfPage();
									}
								}else{ //数据不正确，不能进行操作
									alert("页面跳转出错，"+data.msg);
								}
							}
						}
					});
				$("#accountbalance").val(data.accountbalance);//账户余额
				
			     }
		       })	//----------------------------------投保单信息结束---------------------------------------- 
		      
		       //投保人信息
		       $.ajax({
				 url:path + '/newContEnter/selectBylcappnt.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
					 
					$("#field-8").val(data.appntname);//投保人姓名
					$("#field-9").select2("val",data.idtype);//证件类型
					$("#field-10").val(data.idno);//证件号码
					$("#field-11").select2("val",data.appntsex);//性别
					$("#field-12").val(data.appntbirthdayToStr);//出生日期
					$("#field-12").attr("disabled",true);
					if(dateToString(data.appntenddate)!='2099-01-01'){
						$("#field-15").val(dateToString(data.appntenddate));//证件有效止期
					}else{
						$("#isLongItem").prop("checked",'true');
						$("#field-15").val("2099-01-01");
					}
					
					$("#field-16").select2("val",data.nativeplace);//国籍
					$("#field-17").select2("val",data.occupationcode);//职业代码
					$("#field-19").val(data.salary);//工资
					//$("#field-31").select2("val",data.health);//有无健康标识
					$("#AppHeight").val(data.stature);//身高
					$("#AppWeight").val(data.avoirdupois);//体重
					$("#field-32").select2("val",data.creditgrade);//居民类型
					if(data.rgtaddress=='N'){  //个人年收入
						$("#field-33").val("");
					}else{
						$("#field-33").val(data.rgtaddress);
					}
					$("#company").val(data.company);//工作单位及名称
					$("#Responsibility").select2("val",data.responsibility);//职位及工作内容
					$("#otherResponsibility").val(data.otherresponsibility);//其他
					$("#field-8").attr("disabled",true);
					$("#field-9").attr("disabled",true);
      				$("#field-10").attr("disabled",true);
      				$("#field-11").attr("disabled",true);
      				$("#field-16").attr("disabled",true);
			      }
		       });
		         
		       //投保人地址
		         $.ajax({
				 url:path + '/newContEnter/selectBylcaddress0.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
					$("#field-21").val(data.zipcode);//邮寄编码
					$("#field-22").val(data.mobile);//移动电话
					$("#field-23").val(data.email);//e_main
					$("#field-24").val(data.phone);//电话phone
					$("#field-25").val(data.homezipcode);//homezipcode家庭邮编
					var homephone=data.homephone.split("-");
					$("#areaCall").val(homephone[0]);//区号
					$("#call").val(homephone[1]);//电话
					var postaladdress=data.postaladdress.split("&");
					selectByCity1('loc_province-sub1','loc_city-sub1','loc_town-sub1',"postaladdress", postaladdress[0] , postaladdress[1] , postaladdress[2],postaladdress[3]) ;
					var homeaddress=data.homeaddress.split("&");
					selectByCity1('loc_province-sub2','loc_city-sub2','loc_town-sub2',"homeaddress", homeaddress[0] , homeaddress[1] , homeaddress[2],homeaddress[3]) ;
					$("#homeaddress").val(homeaddress[3]);
					if(data.postalflag=="3"){
						var el = document.getElementById("postalflag");
						el.checked=true;
					}
			      }
		       });
		     	
		       //被保人信息
		       $.ajax({
				 url:path + '/newContEnter/selectBylcinsured.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
					 if(data.length!=0){
						 $("#fwv-4s").val("1");
						 $("#fwv-4b").addClass("disabled");
					 }
				 	if(data.transno!=null){
				 		if(data.relationtoappnt=="00"){
				 			$("#fwv-3b input").attr("disabled",true);
						    $("#fwv-3b select").attr("disabled",true);
						    $("#relationtoappnt").removeAttr("disabled");
				 		}else{
				 			$("#fwv-3b .isCheckbox").attr("disabled",true);
				 		}
				 		$("#relationtoappnt").select2("val",data.relationtoappnt);//与投保人的关系
				 		$("#LCInsuredname").val(data.lcinsuredname);//投保人姓名
				 		$("#LCInsuredidtype").select2("val",data.lcinsuredidtype);//证件类型
				 		$("#LCInsuredidno").val(data.lcinsuredidno);//证件号码
				 		$("#LCInsuredsex").select2("val",data.lcinsuredsex);//性别
				 		$("#LCInsuredbirthday").val(data.lcinsuredbirthdayToStr);//出生日期
				 		$("#LCInsurednativeplace").select2("val",data.lcinsurednativeplace);//国籍
				 		if(dateToString(data.insureidenddate)!='2099-01-01'){
				 			$("#long_term").removeAttr("checked");
				 			$("#insureidenddate").removeAttr("disabled");
				 		}else{
				 			$("#long_term").prop("checked",'true');//回显如果不是9999-12-31，不勾选长期有效
				 			$("#insureidenddate").attr("disabled",true);
				 		}
				 		$("#insureidenddate").val(dateToString(data.insureidenddate));//证件有效止期
				 		$("#InsuHight").val(data.stature);//身高
				 		$("#InsuWeight").val(data.avoirdupois);//体重
				 		$("#annualincome").val(data.rgtaddress)//个人年收入
				 		$("#LCInsuredoccupationcode").select2("val",data.lcinsuredroccupationcode);//职业代码	
				 		$("#Lcinsuredcompany").val(data.lcinsuredcompany);//工作单位及名称
				 		$("#lcinsuredresponsibility").select2("val",data.lcinsuredresponsibility);//职位
				 		$("#lcinsuredotherresponsibility").val(data.lcinsuredotherresponsibility);//其他
				 		
						 //被保人人地址
				         $.ajax({
						 url:path + '/newContEnter/selectBylcaddress1.do',  
				         type: "POST",
				         data:{"transno":transno},
						 success: function(data){
							$("#LCInsuredzipcode").val(data.zipcode);//邮寄编码
							$("#LCInsuredmobile").val(data.mobile);//移动电话
					 		$("#LCInsuredphone").val(data.phone);//家庭电话

							$("#LCInsurede_mail").val(data.email);//e_main
							
							var homephone=data.homephone.split("-");
							$("#LCInsuredareaCall").val(homephone[0]);//区号
							$("#LCInsuredcall").val(homephone[1]);//电话
							var postaladdress=data.postaladdress.split("&");
							selectByCity1('loc_province-sub3','loc_city-sub3','loc_town-sub3',"LCInsuredpostaladdress", postaladdress[0] , postaladdress[1] , postaladdress[2],postaladdress[3]) ;
					      }
				       })
				 	}
			      }
		       });
				
				//主险种信息查询
		         $.ajax({
				 url:path + '/newContEnter/selectLcpol.do',  
		         type: "POST",
		         data:{"transno":transno,"grpcontno":"1"},
				 success: function(data){
					 if(data.length!=0){
						 $("#fwv-22s").val("1");
						 $("#fwv-21s").val("1");
						 $("#fwv-20s").val("1");
						 $("#fwv-22b").addClass("disabled");
					 	 $("#fwv-21b").addClass("disabled");
					 	 $("#fwv-20b").addClass("disabled");
					 }
					if(data.proposalno!=null&&data.proposalno!=""){
						
						$("#fwv-7b .isCheckbox").attr("disabled",true);
						
						$("#riskcode").select2("val",data.riskcode);//保险公司 
						$("#prem").val(data.prem);//保费
						$("#amnt").val(data.amnt);//保额
						$("#mult").val(data.mult);//份数
						$("#insuyears").select2("val",data.insuyear);//保险期间
						
						$("#payendyears").select2("val",data.payendyear);//缴费期间
						if($("#payendyears option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
							$("#payendyears").attr("disabled",true);
						}
						
						$("#payintv").select2("val",data.payintv);//缴费方式
						if($("#payintv option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
							$("#payintv").attr("disabled",true);
						}
						
						$("#getage").select2("val",data.getyear);//年金/约定领取年龄
						if($("#getage option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
							$("#getage").attr("disabled",true);
						}
						
						if(data.getform==0){ //如果年金领取方式是不适用，动态添加option
							var select=document.getElementById("getForm1");
						    var option=document.createElement("option");
							option.value="0";
							option.innerHTML="不适用";
							select.appendChild(option);	
						}
						$("#getForm1").select2("val",data.getform);//年金领取方式
						
						
						if($("#getForm1 option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
							$("#getForm1").attr("disabled",true);
						}
						
						if(data.bonusgetmode==0){
							var select=document.getElementById("DividendOption");
						    var option=document.createElement("option");
							option.value="0";
							option.innerHTML="不适用";
							select.appendChild(option);	
						}
						
						if(data.bonusgetmode==3){
							var select=document.getElementById("DividendOption");
						    var option=document.createElement("option");
							option.value="3";
							option.innerHTML="增额红利";
							select.appendChild(option);	
						}
						$("#DividendOption").select2("val",data.bonusgetmode);//红利给付方式
						if($("#DividendOption option:selected").text()=='不适用'){//数据回显的时候如果选中不适用，不能操作
							$("#DividendOption").attr("disabled",true);
						}
						if($("#DividendOption option:selected").text()=='增额红利'){//数据回显的时候如果选中不适用，不能操作
							$("#DividendOption").attr("disabled",true);
						}
						
						$("#APLOption").select2("val",data.aploption);//保险费逾期未付选择
					}
			      }
		       });
				
		        //税收信息
				$.ajax({
				 url:path + '/newContEnter/selectrevenue.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 	var reason = data.reason1;
				 	var reason2desc = data.reason2desc;
				 	var statement=data.statement;
					 	if(data.length!=0){
					 		$("#fwv-3s").val("1");
					 		$("#fwv-3b").addClass("disabled");
					 	}
				 	$("#statement").select2("val",statement);
				 	
				 	if($("#statement").val()==3 || $("#statement").val()==2){
				 		$("#fwv-5 input").removeAttr("disabled");
				 		$("#fwv-5 select").removeAttr("disabled");
				 		$("#fwv-5 textarea").removeAttr("disabled");
				 		$("#fwv-5b .isCheckbox").attr("disabled",true);
				 	}
				 	
				 	$("#firstname").val(data.firstname);
				 	$("#lastname").val(data.lastname);
				 	if(data.liveheath==1){
						var el = document.getElementById("liveheath");
						el.checked=true;
				 	}
				 	var livingaddress=data.livingaddress.split("&"); 
				 	$("#living_isscountry").val(livingaddress[0]=="null"?"":livingaddress[0]);
				 	$("#living_province").val(livingaddress[1]=="null"?"":livingaddress[1]);
				 	$("#living_city").val(livingaddress[2]=="null"?"":livingaddress[2]);
				 	$("#living_address").val(livingaddress[3]=="null"?"":livingaddress[3]);
				 	if(data.tiveheath==1){
						var el = document.getElementById("tiveheath");
						el.checked=true;
				 	}
				 	
				 	var cnnativeheath =data.cnnativeheath.split("&");
				 	selectByCity1('cnnativeheath_isscountry','cnnativeheath_province','cnnativeheath_city',"cnnativeheath_address", cnnativeheath[0] , cnnativeheath[1] , cnnativeheath[2],cnnativeheath[3]=="null"?"":cnnativeheath[3]) ;
				 	
				 	var ennativeheath =data.ennativeheath.split("&");
				 	$("#ennativeheath_isscountry").val(ennativeheath[0]=="null"?"":ennativeheath[0]);
				 	$("#ennativeheath_province").val(ennativeheath[1]=="null"?"":ennativeheath[1]);
				 	$("#ennativeheath_city").val(ennativeheath[2]=="null"?"":ennativeheath[2]);
				 	$("#ennativeheath_address").val(ennativeheath[3]=="null"?"":ennativeheath[3]);
	  		$.ajax({
				 url:path + '/newContEnter/selectTaxrevenue.do',  
		         type: "POST",
		         data:{"transno":transno},
				 success: function(data){
				 for (var index = 0; index < data.length; index++) {
					 if(index==0){
						 $("#residentnumber0").val(data[index].residentnumber);
						 $("#residentcountry0").val(data[index].residentcountry);
					 }else if(index==1){
						 $("#residentnumber1").val(data[index].residentnumber);
						 $("#residentcountry1").val(data[index].residentcountry);
					 }else{
						 $("#residentnumber2").val(data[index].residentnumber);
						 $("#residentcountry2").val(data[index].residentcountry);
					 }
				 }
				 
				 $("#reason").select2("val",reason);
				 $("#reason").attr('checked','true');
				 if($("#reason").val()=="2"){
					 $("#reason2desc").css("display","block");
					 $("#marginbottom15").nextAll().find("textarea").attr("disabled","true");
				 }
				 $("#reason2desc").val(reason2desc);
				 }
				}); 	
			}
		});
		       var beneSort=document.getElementsByName("beneSort");
		       var benePart=document.getElementsByName("benePart");
		       var beneName=document.getElementsByName("beneName");
		       var beneBirth=document.getElementsByName("beneBirth");
		       var beneIdNumber=document.getElementsByName("beneIdNumber");
		       var beneSex=document.getElementsByName("beneSex");
		       var beneIdCard=document.getElementsByName("beneIdCard");
		       var relationtoinsured=document.getElementsByName("relationtoinsured");
		       //受益人1
		         $.ajax({
				 url:path + '/newContEnter/selectlcbnf.do',  
		         type: "POST",
		         data:{"transno":transno,"bnfgrade":"1"},
				 success: function(data){
				 	if(data.length!=0){
				 		$("#fwv-7s").val("1");
				 		$("#fwv-7b").addClass("disabled");
				 	}
					if(data.getform==1){//法定
					
						$("#beneIsTrue").select2("val","Y");
						$("#fwv-4 input[type='text'").attr("disabled",true);
						$("#fwv-4 select:not(:first)").attr("disabled",true);
					}else if(data.getform==2){
						
						$("#fwv-4 input[type='text'").attr("disabled",false);
						$("#fwv-4 select").attr("disabled",false);
						
						$("#save5").removeAttr("disabled");//保存被保人
						$("#beneIsTrue").select2("val","N");
						$(beneSort[0]).select2("val",data.bnfno);
						benePart[0].value=data.bnflot;//受益人比例
						beneName[0].value=data.name;//姓名
						$(beneSex[0]).select2("val",data.sex);//性别
						
						beneBirth[0].value=data.birthdayToStr;//出生日期
						$(beneIdCard[0]).select2("val",data.idtype);//证件类型
						beneIdNumber[0].value=data.idno;//证件号码
						$(relationtoinsured[0]).select2("val",data.relationtoinsured);//关系
						
						//受益人2
				         $.ajax({
						 url:path + '/newContEnter/selectlcbnf.do',  
				         type: "POST",
				         data:{"transno":transno,"bnfgrade":"2"},
						 success: function(data){
						 		if(data.getform!=null&&data.getform!=""){
						 			//addbenefer();
						 			$(beneSort[1]).select2("val",data.bnfno);
									benePart[1].value=data.bnflot;//受益人比例
									beneName[1].value=data.name;//姓名
									$(beneSex[1]).select2("val",data.sex);//性别
									beneBirth[1].value=data.birthdayToStr;//出生日期
									$(beneIdCard[1]).select2("val",data.idtype);//证件类型
									beneIdNumber[1].value=data.idno;//证件号码
									$(relationtoinsured[1]).select2("val",data.relationtoinsured);//关系
						 		}
						 		
						 //受益人3
				         $.ajax({
						 url:path + '/newContEnter/selectlcbnf.do',  
				         type: "POST",
				         data:{"transno":transno,"bnfgrade":"3"},
						 success: function(data){
			
						 		if(data.getform!=null&&data.getform!=""){
						 			$(beneSort[2]).select2("val",data.bnfno);
									benePart[2].value=data.bnflot;//受益人比例
									beneName[2].value=data.name;//姓名
									$(beneSex[2]).select2("val",data.sex);//性别
									beneBirth[2].value=data.birthdayToStr;//出生日期
									$(beneIdCard[2]).select2("val",data.idtype);//证件类型
									beneIdNumber[2].value=data.idno;//证件号码
									$(relationtoinsured[2]).select2("val",data.relationtoinsured);//关系
						
						 		}
					      }
				       });
					      }
				       });
					}
			      }
		       })  
}
//投保单信息效验
function LccontValidata(){
	if($("#field-1").val()==""||$("#field-1").val()==null){
						
		var id="field-1";
		var msg="请选择保险公司";
	    return Selecttips(id,msg);
	}
		if($("#field-7").val()==""||$("#field-7").val()==null){
			
			var id="field-7";
			var msg="请选择保单递送方式";
            return Selecttips(id,msg);
		}
	if($("#newbankaccno").val()==""||$("#newbankaccno").val()==null){
			
			var id="newbankaccno";
			var msg="请选择客户账户";
            return Selecttips(id,msg);
		}
	
	//如果客户账户是联名账户，做必录校验
	if($("#newbankaccno").find("option:selected").text().trim().substring(1,2)=='联'){
		if($("#AnotherHolderName").val()=="" || $("#AnotherHolderName").val()==null){
			var id = "AnotherHolderName";
			var msg="客户账户为联名账户，请输入另一持有人姓名";
			return tips(id,msg);
		}
		
		if($("#AnotherHolderIdType").val()=="" || $("#AnotherHolderIdType").val()==null){
			var id = "AnotherHolderIdType";
			var msg="客户账户为联名账户，请输入另一持有人证件类型";
			return tips(id,msg);
		}
		
		if($("#AnotherHolderIdNO").val()=="" || $("#AnotherHolderIdNO").val()==null){
			var id = "AnotherHolderIdNO";
			var msg="客户账户为联名账户，请输入另一持有人证件号码";
			return tips(id,msg);
		}
		
	}
	
		return true;
}
//投保人效验

function LcappntValidata(){
	
	
	if($("#field-8").val()==""||$("#field-8").val()==null){
			var id="field-8";
			var msg="请输入投保人姓名";
			return tips(id,msg);
		}
	
	
	if(!($("#field-8").val()==""||$("#field-8").val()==null)){
		//var str =  /[\u4e00-\u9fa5]{2,}/;
		//先判断是否汉字
		if(/^[\u4e00-\u9fa5]+$/.test($("#field-8").val())){
			var str=/^[\u4e00-\u9fa5a-zA-Z]{2,}$/; 
			//再判断汉字是否个数大于2
			if(!str.test($("#field-8").val())){
				var id="field-8";
				var msg="投保人姓名不符合要求";
				return tips(id,msg);
			}
  		}
	}
		if($("#field-10").val()==""||$("#field-10").val()==null){
			
			var id="field-10";
			var msg="请输入证件号码";
			return tips(id,msg);
		}
		if($("#field-9").val()=="I"){
			if($("#field-10").val().length!=15&&$("#field-10").val().length!=18){
				var id="field-10";
				var msg="证件为身份证的时候证件号码长度必须为15或18位";
				return tips(id,msg);
			}
		}
		
		if($("#field-11").val()==""||$("#field-11").val()==null){
			var id="field-11";
			var msg="请选择性别";
            return Selecttips(id,msg);
		}
		
		if($("#field-9").val()=="I"){
			if($("#field-10").val().length==18){
				if(($("#field-10").val().substring(16,17)%2==1&&$("#field-11").val()!="0")||($("#field-10").val().substring(16,17)%2==0&&$("#field-11").val()!="1")){
					var id="field-11";
					var msg="性别与身份证不匹配";
					return tips(id,msg);
				}
			}
			if($("#field-10").val().length==15){
				if(($("#field-10").val().substring(14,15)%2==1&&$("#field-11").val()!="0")||($("#field-10").val().substring(14,15)%2==0&&$("#field-11").val()!="1")){
					var id="field-11";
					var msg="性别与身份证不匹配";
					return tips(id,msg);
				}
			}
		}
		if($("#field-12").val()==""||$("#field-12").val()==null){
			var id="field-12";
			var msg="请选择出生日期";
			return tips(id,msg);
			
		}
		var date=new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
		
		if($("#field-12").val()!=null && $("#field-12").val()!=""){ //出生日期不能晚于今日
			if(Datecompare1(date,$("#field-12").val())==true){
				var id="field-12";
				var msg="出生日期不能晚于今日";
				return tips(id,msg);
			}
		}
		
		//如果证件类型是户口本---年龄必须要小于16周岁
		if($("#field-9").val()=="H"){
			var temp = lessFullYear($("#field-12").val());
			if(temp>15){
				var id="field-12";
				var msg="证件类型为户口本，年龄需要小于16周岁";
				return tips(id,msg);
			}
		}
		
		//如果证件类型是出生证---年龄必须要小于4周岁
		if($("#field-9").val()=="J"){
			var temp = lessFullYear($("#field-12").val());
			if(temp>3){
				var id="field-12";
				var msg="证件类型为出生证，年龄需要小于4周岁";
				return tips(id,msg);
			}
		}
		
		if($("#field-9").val()=="I"){
			var reg = new RegExp("-","g");
			var date=$("#field-12").val().replace(reg,"");
			
			if($("#field-10").val().length==18){
				if($("#field-10").val().substring(6,14)!=date){
					var id="field-12";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
			if($("#field-10").val().length==15){
				if($("#field-10").val().substring(6,12)!=date.substring(2,8)){
					var id="field-12";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
		}
		
		
		if(!$("#isLongItem").is(':checked')){
			if($("#field-15").val()==""||$("#field-15").val()==null){
				var id="field-15";
				var msg="请选择证件有效止期";
				return tips(id,msg);
			}
			
			if(Datecompare(date,$("#field-15").val())==false){
				var id="field-15";
				var msg="证件有效止期不能小于当日";
				return tips(id,msg);
			}
		}
		
		if($("#field-16").val()==""||$("#field-16").val()==null){
             var id="field-16";
			var msg="请选择投保人国籍";
            return Selecttips(id,msg);
		}
		if($("#field-17").val()==""||$("#field-17").val()==null){
			var id="field-17";
			var msg="请选择投保人职业代码";
            return Selecttips(id,msg);
		}
		
		if($("#company").val()=="" || $("#company").val()==null){
			var id="company";
			var msg="请输入工作单位及名称";
			return Selecttips(id,msg);
		}
		
		if($("#Responsibility").val()=="" || $("#Responsibility").val()==null){
			var id="Responsibility";
			var msg="请输入职位及工作内容";
			return Selecttips(id,msg);
		}
		
		if($("#field-19").val()==""||$("#field-19").val()==null){
			var id="field-19";
			var msg="家庭年收入不能为空，如无收入请填写0";
			return tips(id,msg);
		}
		
		var reg1 = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(!reg1.test($("#field-19").val())){
			var id="field-19";
			var msg="家庭年收入格式不正确，请重新输入";
			return tips(id,msg);
		}
		
		if($("#field-21").val()==null||$("#field-21").val()==""){
			var id="field-21";
			var msg="请输入邮寄编码";
			return tips(id,msg);
		}
		
		var regu = /^[1-9]\d*$/;
		if(!regu.test($("#field-21").val())){
			var id="field-21";
			var msg="邮寄编码格式不正确";
			return tips(id,msg);
		}
		
		if($("#field-21").val()!=null && $("#field-21").val()!=""){
			if($("#field-21").val().length!=6){
				var id="field-21";
				var msg="邮寄编码长度必须是6位";
				return tips(id,msg);
			}
		}
		
		if(($("#field-22").val()=="" || $("#field-22").val()==null) && ($("#field-24").val()=="" || $("#field-24").val()==null)){
				var id="field-22";
				var msg="移动电话和家庭电话不能同时为空";
				return tips(id,msg);
		}
		var RegMolibe = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
		
		if($("#field-22").val()!=""&&$("#field-22").val()!=null){
			if(!RegMolibe.test($("#field-22").val())){
				var id="field-22";
				var msg="移动电话格式有误";
				return tips(id,msg);
			}
		}

		if($("#field-24").val()!=""&&$("#field-24").val()!=null){
			if($("#field-24").val().length>15){
				var id="field-24";
				var msg="家庭电话格式有误";
				return tips(id,msg);
			}
			var regu1 = /^[0-9]\d*$/;
			if(!regu1.test($("#field-24").val())){
				var id="field-24";
				var msg="家庭电话格式有误";
				return tips(id,msg);
			}
			
		}
		
		if($("#field-25").val()==null||$("#field-25").val()==""){
			var id="field-25";
			var msg="请输入邮寄编码";
			return tips(id,msg);
		}
		
		if($("#field-25").val().length!=6){
			var id="field-25";
			var msg="邮寄编码长度必须是6位";
			return tips(id,msg);
		}
		
		if(!regu.test($("#field-25").val())){
			var id="field-25";
			var msg="邮寄编码格式不正确";
			return tips(id,msg);
		}
		
		if($("#field-23").val()==null||$("#field-23").val()==""){
			var id="field-23";
			var msg="请输入E-mail";
			return tips(id,msg);
		}
		//新需求--如果是NA,则不对E-mail的规则做校验
		if($("#field-23").val() != "NA"){
			var szReg=/^[A-Za-zd0-9_-]+([-_.][A-Za-zd0-9_-]+)*@([A-Za-zd0-9_-]+[-.])+[A-Za-zd0-9_-]{2,5}$/; 
			if(!szReg.test($("#field-23").val())){
				var id="field-23";
				var msg="E-mail格式有误";
				return tips(id,msg);
			}
			
			if($("#field-23").val().length>50){
				var id="field-23";
				var msg="E-mail长度超长";
				return tips(id,msg);
			}
		}
		
		if($("#field-32").val()==""||$("#field-32").val()==null){
			
			var id="field-32";
			var msg="请选择居民居住类型";
            return Selecttips(id,msg);
		}
		
		if($("#company").val()==""||$("#company").val()==null){
			var id = "company";
			var msg = "请输入工作单位及名称";
			return Selecttips(id,msg);
		}
		
		if($("#field-33").val()==""||$("#field-33").val()==null){
			var id="field-33";
			var msg="个人年收入不能为空，如无收入请填写0";
			return tips(id,msg);
		}
		
		var reg2 = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		if(!reg2.test($("#field-33").val())){
			var id="field-33";
			var msg="个人年收入格式不正确，请重新输入";
			return tips(id,msg);
		}
		
		if($("#premiumBudget").val()==""||$("#premiumBudget").val()==null){
			var id="premiumBudget";
			var msg="请输入预算保费";
			return tips(id,msg);
		}
		if(!reg2.test($("#premiumBudget").val())){
			var id="premiumBudget";
			var msg="预算保费格式不正确，请重新输入";
			return tips(id,msg);
		}
		
		
		var prem = (parseInt($("#field-19").val())+parseInt($("#field-33").val()))*1.5;
		if($("#premiumBudget").val()>prem){
			var id="premiumBudget";
			var msg="预算保费不能超过个人年收入和家庭年收入的150%";
			return tips(id,msg);
		}
		
		if($("#loc_province-sub1").val()==""||$("#loc_province-sub1").val()==null){
			var id="loc_province-sub1";
			var msg="请选择居住地址省份";
            return CitySelecttips(id,msg);
		}
		if($("#loc_city-sub1").val()==""||$("#loc_city-sub1").val()==null){
			var id="loc_city-sub1";
			var msg="请选择居住地址地级市";
            return CitySelecttips(id,msg);
		}
		if($("#loc_town-sub1").val()==""||$("#loc_town-sub1").val()==null){
			var id="loc_town-sub1";
			var msg="请选择居住地址市县区";
            return CitySelecttips(id,msg);
		}
		if($("#postaladdress").val()==""||$("#postaladdress").val()==null){
			
			
			var id="postaladdress";
			var msg="请输入居住地址详细地址";
			return tips(id,msg);
		}
		
		if($("#loc_province-sub2").val()==""||$("#loc_province-sub2").val()==null){
			var id="loc_province-sub2";
			var msg="请选择联系地址省份";
            return CitySelecttips(id,msg);
		}
		if($("#loc_city-sub2").val()==""||$("#loc_city-sub2").val()==null){
				var id="loc_city-sub2";
			var msg="请选择联系地址地级市";
            return CitySelecttips(id,msg);
		}
		if($("#loc_town-sub2").val()==""||$("#loc_town-sub2").val()==null){
			var id="loc_town-sub2";
			var msg="请选择联系地址市县区";
            return CitySelecttips(id,msg);
		}
		if($("#homeaddress").val()==""||$("#homeaddress").val()==null){
				
			var id="homeaddress";
			var msg="请输入联系地址详细地址";
			return tips(id,msg);
		}
		
		if($("#GoalType").val()==""||$("#GoalType").val()==null){
			var id="GoalType";
			var msg="请选择需求类型";
			return tips(id,msg);
		}
		return true;
}
//被保人效验	

function LcinsuredValidata(){
	if($("#relationtoappnt").val()==""||$("#relationtoappnt").val()==null){
		var id="relationtoappnt";
		var msg="请选择与投保人的关系";
        return Selecttips(id,msg);
	}
	
	if($("#LCInsuredname").val()==""||$("#LCInsuredname").val()==null){
		var id="LCInsuredname";
		var msg="请输入被保人姓名";
		return tips(id,msg);
	}
	
	if(!($("#LCInsuredname").val()==""||$("#LCInsuredname").val()==null)){
		//var str =  /[\u4e00-\u9fa5]{2,}/;
		//先判断是否汉字
		if(/^[\u4e00-\u9fa5]+$/.test($("#LCInsuredname").val())){
		var str=/^[\u4e00-\u9fa5a-zA-Z]{2,}$/; 
		//再判断汉字是否个数大于2
		if(!str.test($("#LCInsuredname").val())){
			var id="LCInsuredname";
			var msg="投保人姓名不符合要求";
			return tips(id,msg);
		}
		
  		}
	}
	
	if($("#LCInsuredidtype").val()==""||$("#LCInsuredidtype").val()==null){
		var id="LCInsuredidtype";
		var msg="请选择被保人的证件类型";
        return Selecttips(id,msg);
	}
	if($("#LCInsuredidno").val()==""||$("#LCInsuredidno").val()==null){
		var id="LCInsuredidno";
		var msg="请输入被保人证件号码";
		return tips(id,msg);
	}
	if($("#LCInsuredidtype").val()=="I"){
		if($("#LCInsuredidno").val().length!=15&&$("#LCInsuredidno").val().length!=18){
			var id="LCInsuredidno";
			var msg="证件类型是身份证，证件号码长度必须是15或18位";
			return tips(id,msg);
		}
	}
	if($("#LCInsuredsex").val()==""||$("#LCInsuredsex").val()==null){
		var id="LCInsuredsex";
		var msg="请选择被保人性别";
		return Selecttips(id,msg);
	}
	
	if($("#LCInsuredidtype").val()=="I"){
		if($("#LCInsuredidno").val().length==18){
			if(($("#LCInsuredidno").val().substring(16,17)%2==1&&$("#LCInsuredsex").val()!="0")||($("#LCInsuredidno").val().substring(16,17)%2==0&&$("#LCInsuredsex").val()!="1")){
				var id="LCInsuredsex";
				var msg="性别与身份证不匹配";
				return tips(id,msg);
			}
		}
		if($("#LCInsuredidno").val().length==15){
			if(($("#LCInsuredidno").val().substring(14,15)%2==1&&$("#LCInsuredsex").val()!="0")||($("#LCInsuredidno").val().substring(14,15)%2==0&&$("#LCInsuredsex").val()!="1")){
				var id="LCInsuredsex";
				var msg="性别与身份证不匹配";
				return tips(id,msg);
			}
		}
	}
	
	if($("#LCInsuredbirthday").val()==""||$("#LCInsuredbirthday").val()==null){
		var id="LCInsuredbirthday";
		var msg="请输入被保人出生日期";
		return tips(id,msg);
	}
	
	var date=new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
	
	if($("#LCInsuredbirthday").val()!=null && $("#LCInsuredbirthday").val()!=""){ //出生日期不能晚于今日
		if(Datecompare1(date,$("#LCInsuredbirthday").val())==true){
			var id="LCInsuredbirthday";
			var msg="被保人出生日期不能晚于今日";
			return tips(id,msg);
		}
	}
	
	//如果证件类型是户口本---年龄必须要小于16周岁
	if($("#LCInsuredidtype").val()=="H"){
		var temp = lessFullYear($("#LCInsuredbirthday").val());
		if(temp>15){
			var id="LCInsuredbirthday";
			var msg="证件类型为户口本，年龄需要小于16周岁";
			return tips(id,msg);
		}
	}
	
	//如果证件类型是出生证---年龄必须要小于4周岁
	if($("#LCInsuredidtype").val()=="J"){
		var temp = lessFullYear($("#LCInsuredbirthday").val());
		if(temp>3){
			var id="LCInsuredbirthday";
			var msg="证件类型为出生证，年龄需要小于4周岁";
			return tips(id,msg);
		}
	}
	
	if($("#LCInsuredidtype").val()=="I"){
		
		var reg = new RegExp("-","g");
		var date=$("#LCInsuredbirthday").val().replace(reg,"");
		
		if($("#LCInsuredidno").val().length==18){
			if($("#LCInsuredidno").val().substring(6,14)!=date){
				var id="LCInsuredbirthday";
				var msg="出生日期与身份证不匹配";
				return tips(id,msg);
			}
		}
		if($("#LCInsuredidno").val().length==15){
			if($("#LCInsuredidno").val().substring(6,12)!=date.substring(2,8)){
				var id="LCInsuredbirthday";
				var msg="出生日期与身份证不匹配";
				return tips(id,msg);
			}
		}
	}
	
	if($("#insureidenddate").val()==""||$("#insureidenddate").val()==null){
		var id="insureidenddate";
		var msg="请输入被保人证件有效止期";
		return tips(id,msg);
	}
	
	if(Datecompare(date,$("#insureidenddate").val())==false){
			var id="insureidenddate";
			var msg="证件有效止期必须晚于今天";
			return tips(id,msg);
		}
	
	if($("#LCInsurednativeplace").val()==null||$("#LCInsurednativeplace").val()==""){
		var id="LCInsurednativeplace";
		var msg="请选择国籍";
		return Selecttips(id,msg);
	}
	
	if($("#LCInsurede_mail").val()==null || $("#LCInsurede_mail").val()==""){
		var id="LCInsurede_mail";
		var msg="E-mail不能为空";
		return tips(id,msg);
	}
	
	//新需求--如果是NA,则不对E-mail的规则做校验
	if($("#LCInsurede_mail").val() != "NA"){
		var szReg=/^[A-Za-zd0-9_-]+([-_.][A-Za-zd0-9_-]+)*@([A-Za-zd0-9_-]+[-.])+[A-Za-zd0-9_-]{2,5}$/;
		if($("#LCInsurede_mail").val() != null && $("#LCInsurede_mail").val() != ""){
			if(!szReg.test($("#LCInsurede_mail").val())){
				var id="LCInsurede_mail";
				var msg="E-mail格式有误";
				return tips(id,msg);
			}
		}
	}
	
	if($("#LCInsuredzipcode").val()==null||$("#LCInsuredzipcode").val()==""){
		var id="LCInsuredzipcode";
		var msg="请输入邮寄编码";
		return tips(id,msg);
	}
	
	if($("#LCInsuredzipcode").val().length!=6){
		var id="LCInsuredzipcode";
		var msg="邮寄编码长度必须是6位";
		return tips(id,msg);
	}
	var regu = /^[1-9]\d*$/;
	if(!regu.test($("#LCInsuredzipcode").val())){
		var id="LCInsuredzipcode";
		var msg="邮寄编码格式不正确";
		return tips(id,msg);
	}
	
	
	if($("#LCInsuredoccupationcode").val()==""||$("#LCInsuredoccupationcode").val()==null){
		var id="LCInsuredoccupationcode";
		var msg="请选择职业代码";
		return Selecttips(id,msg);
	}

	if($("#Lcinsuredcompany").val()=="" || $("#Lcinsuredcompany").val()==null){
		var id="Lcinsuredcompany";
		var msg="请输入工作单位及名称";
		return Selecttips(id,msg);
	}
	
	if($("#lcinsuredresponsibility").val()=="" || $("#lcinsuredresponsibility").val()==null){
		var id="lcinsuredresponsibility";
		var msg="请输入职位及工作内容";
		return Selecttips(id,msg);
	}
	
	if(($("#LCInsuredmobile").val()=="" || $("#LCInsuredmobile").val()==null) && ($("#LCInsuredphone").val()=="" || $("#LCInsuredphone").val()==null)){
		var id="LCInsuredmobile";
		var msg="移动电话和家庭电话不能同时为空";
		return tips(id,msg);
	}
	
	var RegMolibe = /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
	if($("#LCInsuredmobile").val()!=null&&$("#LCInsuredmobile").val()!=""){
		if(!RegMolibe.test($("#LCInsuredmobile").val())){
			var id="LCInsuredmobile";
			var msg="移动电话格式有误";
			return tips(id,msg);
		}
	}
	
	if($("#LCInsuredphone").val()!=null && $("#LCInsuredphone").val()!=""){
		if($("#LCInsuredphone").val().length>15){
			var id="LCInsuredphone";
			var msg="家庭电话格式有误";
			return tips(id,msg);
		}
		var regu2 = /^[0-9]\d*$/;
		if(!regu2.test($("#LCInsuredphone").val())){
			var id="LCInsuredphone";
			var msg="家庭电话格式有误";
			return tips(id,msg);
		}
	}

	
	if($("#annualincome").val()==""||$("#annualincome").val()==null){
		var id="annualincome";
		var msg="个人年收入不能为空，如无收入请填写0";
		return tips(id,msg);
	}
	
	var reg2 = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	if(!reg2.test($("#annualincome").val())){
		var id="annualincome";
		var msg="个人年收入格式不正确，请重新输入";
		return tips(id,msg);
	}
	
	if($("#loc_province-sub3").val()==""||$("#loc_province-sub1").val()==null){
		var id="loc_province-sub3";
		var msg="请选择居住地址省份";
        return CitySelecttips(id,msg);
	}
	if($("#loc_city-sub3").val()==""||$("#loc_city-sub1").val()==null){
		var id="loc_city-sub3";
		var msg="请选择居住地址地级市";
        return CitySelecttips(id,msg);
	}
	if($("#loc_town-sub3").val()==""||$("#loc_town-sub1").val()==null){
		var id="loc_town-sub3";
		var msg="请选择居住地址市县区";
        return CitySelecttips(id,msg);
	}
	if($("#LCInsuredpostaladdress").val()==""||$("#LCInsuredpostaladdress").val()==null){
		var id="LCInsuredpostaladdress";
		var msg="请输入居住地址详细地址";
		return tips(id,msg);
	}
	
	
	//投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁  ---删除请谨慎
	/*if($("#relationtoappnt").val()=="02" || $("#relationtoappnt").val()=="03" || $("#relationtoappnt").val()=="04" || $("#relationtoappnt").val()=="05"){
		var str1 = $("#field-12").val().split("-");//投保人生日
		var str2 = $("#LCInsuredbirthday").val().split("-");//被保人生日
		
		if((parseInt(str1[0])-parseInt(str2[0]))>0){   //投保人年龄小于被保人  
			if((parseInt(str1[0])-parseInt(str2[0]))<18){ //投保人的年龄-被保人的年龄小于18：不符合要求
				var id="LCInsuredbirthday";
				var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
				return Selecttips(id,msg);
			}else if((parseInt(str1[0])-parseInt(str2[0]))==18){//投保人年龄-被保人年龄==18，继续校验月份
				if((parseInt(str2[1])-parseInt(str1[1]))>0){ //被的生日月份比投保人晚，则年龄小于18周岁
					var id="LCInsuredbirthday";
					var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
					return Selecttips(id,msg);
				}else if((parseInt(str2[1])-parseInt(str1[1]))==0){//如果投保人的生日月份和被保人月份相同，比较日期
					if((parseInt(str2[2])-parseInt(str1[2]))>0){//如果投保人的生日日期比被保人晚，则年龄小于18周岁
						var id="LCInsuredbirthday";
						var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
						return Selecttips(id,msg);
					}
				}
			}
		}
		if((parseInt(str2[0])-parseInt(str1[0]))>0){//被保人年龄小于投保人
			if((parseInt(str2[0])-parseInt(str1[0]))<18){//被保人年龄-投保人年龄<18：不符合要求
				var id="LCInsuredbirthday";
				var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
				return Selecttips(id,msg);
			}else if((parseInt(str2[0])-parseInt(str1[0]))==18){//被保人年龄-投保人年龄==18，继续校验月份
				if((parseInt(str1[1])-parseInt(str2[1]))>0){//投保人生日月份比被保人晚，年龄小于18周岁
					var id="LCInsuredbirthday";
					var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
					return Selecttips(id,msg);
				}else if((parseInt(str1[1])-parseInt(str2[1]))==0){//被保人生日月份与投保人相同，校验日期
					alert((parseInt(str1[2])-parseInt(str2[2])));
					if((parseInt(str1[2])-parseInt(str2[2]))>0){//如果被保人的生日日期比投保人晚，则年龄小于18周岁
						var id="LCInsuredbirthday";
						var msg="投保人与被保人的关系为父子、父女、母子或者母女,年龄相差不能小于18岁";
						return Selecttips(id,msg);
					}
				}
			}
		} 
		
	}*/
	
	//如果选择与被保人的关系不是本人，但是证件类型，证件号码，生日相同，则提示
	if($("#relationtoappnt").val()!='00'){
		if($("#field-9").val()==$("#LCInsuredidtype").val() && $("#field-10").val()==$("#LCInsuredidno").val() && $("#field-12").val()==$("#LCInsuredbirthday").val()){
			var id="LCInsuredbirthday";
			var msg="投保人与被保人关系非本人，而件类型、证件号、生日相同，请重新确认关系";
			return tips(id,msg);
		}
	}
	
	return true;	
}

	//受益人效验
function lcbnfValidata(){
	
	if($("#beneIsTrue").val()==""||$("#beneIsTrue").val()==null){
		var id="beneIsTrue";
		var msg="请选择是否法定受益人";
        return CitySelecttips(id,msg);
        
	}
	
	var date=new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
	
	if($("#beneIsTrue").val()=="N"){
	
	if($("#beneSort0").val()==""||$("#beneSort0").val()==null){
		var id="beneSort0";
		var msg="请选择受益人顺序";
        return CitySelecttips(id,msg);
	}
	if($("#benePart0").val()==""||$("#benePart0").val()==null){
		var id="benePart0";
		var msg="请输入受益人比例";
        return tips(id,msg);
	}
	if($("#beneName0").val()==""||$("#beneName0").val()==null){
		var id="beneName0";
		var msg="请输入受益人姓名";
        return tips(id,msg);
	}
	
	if($("#beneSex0").val()==""||$("#beneSex0").val()==null){
		var id="beneSex0";
		var msg="请选择受益人性别";
        return CitySelecttips(id,msg);
	}
	
	if($("#beneBirth0").val()==""||$("#beneBirth0").val()==null){
		var id="beneBirth0";
		var msg="请选择受益人出生日期";
        return tips(id,msg);
	}
	
	if($("#beneBirth0").val()!=null && $("#beneBirth0").val()!=""){ //出生日期不能晚于今日
		if(Datecompare1(date,$("#beneBirth0").val())==true){
			var id="beneBirth0";
			var msg="受益人出生日期不能晚于今日";
			return tips(id,msg);
		}
	}
	
	if($("#beneIdCard0").val()==""||$("#beneIdCard0").val()==null){
		var id="beneIdCard0";
		var msg="请选择受益人证件类型";
        return CitySelecttips(id,msg);
	}
	if($("#beneIdNumber0").val()==""||$("#beneIdNumber0").val()==null){
		var id="beneIdNumber0";
		var msg="请输入受益人证件号码";
        return tips(id,msg);
	}
	if($("#relationtoinsured0").val()==""||$("#relationtoinsured0").val()==null){
		var id="relationtoinsured0";
		var msg="请选择受益人与被保人的关系";
        return CitySelecttips(id,msg);
	}
		
	//如果受益人证件类型是身份证
	if($("#beneIdCard0").val()=="I"){
		
		if($("#beneIdNumber0").val().length != 18 && $("#beneIdNumber0").val().length != 15){
			var id="beneIdNumber0";
			var msg="身份证的长度必须为15位或者18位";
			return tips(id,msg);
		}
		
		var reg = new RegExp("-","g");
		var date=$("#beneBirth0").val().replace(reg,"");
		
		if($("#beneIdNumber0").val().length==18){
			if($("#beneIdNumber0").val().substring(6,14)!=date){
				var id="beneBirth0";
				var msg="出生日期与身份证不匹配";
				return tips(id,msg);
			}
		}
		if($("#beneIdNumber0").val().length==15){
			if($("#beneIdNumber0").val().substring(6,12)!=date.substring(2,8)){
				var id="beneBirth0";
				var msg="出生日期与身份证不匹配";
				return tips(id,msg);
			}
		}
		
		if($("#beneIdNumber0").val().length==18){
			if(($("#beneIdNumber0").val().substring(16,17)%2==1&&$("#beneSex0").val()!="0")||($("#beneIdNumber0").val().substring(16,17)%2==0&&$("#beneSex0").val()!="1")){
				var id="beneSex0";
				var msg="性别与身份证不匹配";
				return CitySelecttips(id,msg);
			}
		}
		if($("#beneIdNumber0").val().length==15){
			if(($("#beneIdNumber0").val().substring(14,15)%2==1&&$("#beneSex0").val()!="0")||($("#beneIdCard0").val().substring(14,15)%2==0&&$("#beneSex0").val()!="1")){
				var id="beneSex0";
				var msg="性别与身份证不匹配";
				return CitySelecttips(id,msg);
			}
		}
	}
	
	//如果证件类型是户口本---年龄必须要小于16周岁
	if($("#beneIdCard0").val()=="H"){
		var temp = lessFullYear($("#beneBirth0").val());
		if(temp>15){
			var id="beneBirth0";
			var msg="证件类型为户口本，年龄需要小于16周岁";
			return tips(id,msg);
		}
	}
	
	//如果证件类型是出生证---年龄必须要小于4周岁
	if($("#beneIdCard0").val()=="J"){
		var temp = lessFullYear($("#beneBirth0").val());
		if(temp>3){
			var id="beneBirth0";
			var msg="证件类型为出生证，年龄需要小于4周岁";
			return tips(id,msg);
		}
	}
	
	//选中指定受益人之后，受益人至少需要填一个，那么只要没有1的都是说明没有从1开始，不符合要求
	if($("#beneSort0").val()!='1' && $("#beneSort1").val()!='1' && $("#beneSort2").val()!='1'){
		var id ="";
		var msg="必须要有第一受益人";
		return CitySelecttips(id,msg);
	}
}
		
	
	
	if($("#beneSort1").val()!=""&&$("#beneSort1").val()!=null){
	
		if($("#benePart1").val()==""||$("#benePart1").val()==null){
			var id="benePart1";
			var msg="请输入受益人比例";
	        return tips(id,msg);
		}
		if($("#beneName1").val()==""||$("#beneName1").val()==null){
			var id="beneName1";
			var msg="请输入受益人姓名";
	        return tips(id,msg);
		}
		
		if($("#beneSex1").val()==""||$("#beneSex1").val()==null){
			var id="beneSex1";
			var msg="请选择受益人性别";
	        return CitySelecttips(id,msg);
		}
		
		if($("#beneBirth1").val()==""||$("#beneBirth1").val()==null){
			var id="beneBirth1";
			var msg="请选择受益人出生日期";
	        return tips(id,msg);
		}
		
		if($("#beneBirth1").val()!=null && $("#beneBirth1").val()!=""){ //出生日期不能晚于今日
			if(Datecompare1(date,$("#beneBirth1").val())==true){
				var id="beneBirth1";
				var msg="受益人出生日期不能晚于今日";
				return tips(id,msg);
			}
		}
		
		if($("#beneIdCard1").val()==""||$("#beneIdCard1").val()==null){
			var id="beneIdCard1";
			var msg="请选择受益人证件类型";
	        return CitySelecttips(id,msg);
		}
		
		if($("#beneIdNumber1").val()==""||$("#beneIdNumber1").val()==null){
			var id="beneIdNumber1";
			var msg="请输入受益人证件号码";
	        return tips(id,msg);
		}
		if($("#relationtoinsured1").val()==""||$("#relationtoinsured1").val()==null){
			var id="relationtoinsured1";
			var msg="请选择受益人与被保人的关系";
	        return CitySelecttips(id,msg);
		}
		
		//如果受益人证件类型是身份证
		if($("#beneIdCard1").val()=="I"){
			
			if($("#beneIdNumber1").val().length != 18 && $("#beneIdNumber1").val().length != 15){
				var id="beneIdNumber1";
				var msg="身份证的长度必须为15位或者18位";
				return tips(id,msg);
			}
			var reg = new RegExp("-","g");
			var date=$("#beneBirth1").val().replace(reg,"");
			
			if($("#beneIdNumber1").val().length==18){
				if($("#beneIdNumber1").val().substring(6,14)!=date){
					var id="beneBirth1";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
			if($("#beneIdNumber1").val().length==15){
				if($("#beneIdNumber1").val().substring(6,12)!=date.substring(2,8)){
					var id="beneBirth1";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
			
			if($("#beneIdNumber1").val().length==18){
				if(($("#beneIdNumber1").val().substring(16,17)%2==1&&$("#beneSex1").val()!="0")||($("#beneIdNumber1").val().substring(16,17)%2==0&&$("#beneSex1").val()!="1")){
					var id="beneSex1";
					var msg="性别与身份证不匹配";
					return CitySelecttips(id,msg);
				}
			}
			if($("#beneIdNumber1").val().length==15){
				if(($("#beneIdNumber1").val().substring(14,15)%2==1&&$("#beneSex1").val()!="0")||($("#beneIdCard1").val().substring(14,15)%2==0&&$("#beneSex1").val()!="1")){
					var id="beneSex1";
					var msg="性别与身份证不匹配";
					return CitySelecttips(id,msg);
				}
			}
		}
		
		//如果证件类型是户口本---年龄必须要小于16周岁
		if($("#beneIdCard1").val()=="H"){
			var temp = lessFullYear($("#beneBirth1").val());
			if(temp>15){
				var id="beneBirth1";
				var msg="证件类型为户口本，年龄需要小于16周岁";
				return tips(id,msg);
			}
		}
		
		//如果证件类型是出生证---年龄必须要小于4周岁
		if($("#beneIdCard1").val()=="J"){
			var temp = lessFullYear($("#beneBirth1").val());
			if(temp>3){
				var id="beneBirth1";
				var msg="证件类型为出生证，年龄需要小于4周岁";
				return tips(id,msg);
			}
		}
		
	}
	
	if($("#beneSort2").val()!=""&&$("#beneSort2").val()!=null){
	
		if($("#benePart2").val()==""||$("#benePart2").val()==null){
			var id="benePart2";
			var msg="请输入受益人比例";
	        return tips(id,msg);
		}
		if($("#beneName2").val()==""||$("#beneName2").val()==null){
			var id="beneName2";
			var msg="请输入受益人姓名";
	        return tips(id,msg);
		}
		
		if($("#beneSex2").val()==""||$("#beneSex2").val()==null){
			var id="beneSex2";
			var msg="请选择受益人性别";
	        return CitySelecttips(id,msg);
		}
		
		if($("#beneBirth2").val()==""||$("#beneBirth2").val()==null){
			var id="beneBirth2";
			var msg="请选择受益人出生日期";
	        return tips(id,msg);
		}
		
		if($("#beneBirth2").val()!=null && $("#beneBirth2").val()!=""){ //出生日期不能晚于今日
			if(Datecompare1(date,$("#beneBirth2").val())==true){
				var id="beneBirth2";
				var msg="受益人出生日期不能晚于今日";
				return tips(id,msg);
			}
		}
		
		if($("#beneIdCard2").val()==""||$("#beneIdCard2").val()==null){
			var id="beneIdCard2";
			var msg="请选择受益人证件类型";
	        return CitySelecttips(id,msg);
		}
		
		if($("#beneIdNumber2").val()==""||$("#beneIdNumber2").val()==null){
			var id="beneIdNumber2";
			var msg="请输入受益人证件号码";
	        return tips(id,msg);
		}
		if($("#relationtoinsured2").val()==""||$("#relationtoinsured2").val()==null){
			var id="relationtoinsured2";
			var msg="请选择受益人与被保人的关系";
	        return CitySelecttips(id,msg);
		}
		
		//如果受益人证件类型是身份证
		if($("#beneIdCard2").val()=="I"){
			
			if($("#beneIdNumber2").val().length != 18 && $("#beneIdNumber2").val().length != 15){
				var id="beneIdNumber2";
				var msg="身份证的长度必须为15位或者18位";
				return tips(id,msg);
			}
			
			var reg = new RegExp("-","g");
			var date=$("#beneBirth2").val().replace(reg,"");
			
			if($("#beneIdNumber2").val().length==18){
				if($("#beneIdNumber2").val().substring(6,14)!=date){
					var id="beneBirth2";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
			if($("#beneIdNumber2").val().length==15){
				if($("#beneIdNumber2").val().substring(6,12)!=date.substring(2,8)){
					var id="beneBirth2";
					var msg="出生日期与身份证不匹配";
					return tips(id,msg);
				}
			}
			
			if($("#beneIdNumber2").val().length==18){
				if(($("#beneIdNumber2").val().substring(16,17)%2==1&&$("#beneSex2").val()!="0")||($("#beneIdNumber2").val().substring(16,17)%2==0&&$("#beneSex2").val()!="1")){
					var id="beneSex2";
					var msg="性别与身份证不匹配";
					return CitySelecttips(id,msg);
				}
			}
			if($("#beneIdNumber2").val().length==15){
				if(($("#beneIdNumber2").val().substring(14,15)%2==1&&$("#beneSex2").val()!="0")||($("#beneIdCard2").val().substring(14,15)%2==0&&$("#beneSex2").val()!="1")){
					var id="beneSex2";
					var msg="性别与身份证不匹配";
					return CitySelecttips(id,msg);
				}
			}
		}
		
		//如果证件类型是户口本---年龄必须要小于16周岁
		if($("#beneIdCard2").val()=="H"){
			var temp = lessFullYear($("#beneBirth2").val());
			if(temp>15){
				var id="beneBirth2";
				var msg="证件类型为户口本，年龄需要小于16周岁";
				return tips(id,msg);
			}
		}
		
		//如果证件类型是出生证---年龄必须要小于4周岁
		if($("#beneIdCard2").val()=="J"){
			var temp = lessFullYear($("#beneBirth2").val());
			if(temp>3){
				var id="beneBirth2";
				var msg="证件类型为出生证，年龄需要小于4周岁";
				return tips(id,msg);
			}
		}
	}
	var bnfArray = new Array();//声明数组，保存受益人对象
	var ObjBnf0 = {
			"beneSort":$("#beneSort0").val(),
			"benePart":$("#benePart0").val()
	}
	var ObjBnf1 = {
			"beneSort":$("#beneSort1").val(),
			"benePart":$("#benePart1").val()
	}
	var ObjBnf2 = {
			"beneSort":$("#beneSort2").val(),
			"benePart":$("#benePart2").val()
	}
	bnfArray.push(ObjBnf0);//将受益人放入数组对象
	bnfArray.push(ObjBnf1);
	bnfArray.push(ObjBnf2);
	
	var temp1="";
	var temp2="";
	var temp3="";
	bnfArray.forEach(function(item,index){  //遍历判断，如果是同一顺位受益人则将比例相加
		if(item.beneSort!="" && item.beneSort!=null){
			if(item.beneSort=='1'){
				var t = temp1==""?0:temp1;
				temp1 = t + parseInt(item.benePart);
			}else if(item.beneSort=='2'){
				var t = temp2==""?0:temp2;
				temp2 = t + parseInt(item.benePart);
			}else if(item.beneSort=='3'){
				var t = temp3==""?0:temp3;
				temp3 = t + parseInt(item.benePart);
			}
		}
	});
	if(temp1!="" && temp1!='100'){  //判断受益比例之和是不是为空，如果为空不校验，不为空，判断收益比例之后是否为100；
		alert("同一受益顺序比例之和必须为100%");
		return false;
	}
	if(temp2!="" && temp2!='100'){
		alert("同一受益顺序比例之和必须为100%");
		return false;
	}
	if(temp3!="" && temp3!='100'){
		alert("同一受益顺序比例之和必须为100%");
		return false;
	}
	
}
	
	function lcpolValidata(){
		
		if($("#riskcode").val()==null||$("#riskcode").val()==""){
			alert("请选择险种");
			$("#riskcode").focus();
			return false;
		}
		
		if($("#prem").val()==""||$("#prem").val()==null){
			alert("请输入保费");
			$("#prem").focus();
			return false;
		}
		if($("#amnt").val()==""||$("#amnt").val()==null){
				alert("请输入保额");
				$("#amnt").focus();
				return false;
		}
		if($("#insuyears").val()==""||$("#insuyears").val()==null){
			alert("请选择保险期间");
			$("#insuyears").focus();
			return false;
		}
		
		if($("#payendyears").val()==""||$("#payendyears").val()==null){
			alert("请选择缴费期间");
			$("#payendyears").focus();
			return false;
		}
		
		if($("#payintv").val()==""||$("#payintv").val()==null){
			alert("请选择缴费方式");
			$("#payintv").focus();
			return false;
		}
		
		if($("#getForm1").val()==""||$("#getForm1").val()==null){
			alert("请选择年金领取方式");
			$("#getForm1").focus();
			return false;				
		}
		//投连险投资账户校验
		if(riskTypeflag=='01'){
			
			//投资账户1为必填
			if($("#a0").val()==null || $("#a0").val()==""){
				alert("请选择投资账户");
				$("#a0").focus();
				return false;
			}
			//投资比例1为必填
			if($("#b0").val()==null || $("#b0").val()==""){
				alert("请输入投资比例");
				$("#b0").focus();
				return false;
			}
			
			//如果投资账户2有值  那么投资比例2也为必填
			if($("#a1").val()!=null && $("#a1").val()!=""){
				if($("#b1").val()==null || $("#b1").val()==""){
					alert("请输入投资比例");
					$("#b1").focus();
					return false;
				}
			}
			
			//如果投资账户3有值  那么投资比例3也为必填
			if($("#a2").val()!=null && $("#a2").val()!=""){
				if($("#b2").val()==null || $("#b2").val()==""){
					alert("请输入投资比例");
					$("#b2").focus();
					return false;
				}
			}
			
			//如果投资账户4有值  那么投资比例4也为必填
			if($("#a3").val()!=null && $("#a3").val()!=""){
				if($("#b3").val()==null || $("#b3").val()==""){
					alert("请输入投资比例");
					$("#b3").focus();
					return false;
				}
			}
			
			//如果投资账户5有值  那么投资比例5也为必填
			if($("#a4").val()!=null && $("#a4").val()!=""){
				if($("#b4").val()==null || $("#b4").val()==""){
					alert("请输入投资比例");
					$("#b4").focus();
					return false;
				}
			}
			var num = parseInt($("#b0").val())+parseInt($("#b1").val()==""?0:$("#b1").val())+parseInt($("#b2").val()==""?0:$("#b2").val())+parseInt($("#b3").val()==""?0:$("#b3").val())+parseInt($("#b4").val()==""?0:$("#b4").val());
			if(num!=100){
				alert("投资比例总和必须为100%");
				return false;
			}
			var a0 = $("#a0").val()==""?"a0":$("#a0").val();
			var a1 = $("#a1").val()==""?"a1":$("#a1").val();
			var a2 = $("#a2").val()==""?"a2":$("#a2").val();
			var a3 = $("#a3").val()==""?"a3":$("#a3").val();
			var a4 = $("#a4").val()==""?"a4":$("#a4").val();
			if(a0==a1||a0==a2||a0==a3||a0==a4||a1==a2||a1==a3||a1==a4||a2==a3||a2==a4||a3==a4){
				alert("投资账户不能重复");
				return false;
			}
		}
		
		/**
		 * 险种对保额保费校验
		 * 
		 * */
		var Riskcode = $("#riskcode").val();
		var Amnt = parseInt($("#amnt").val());
		//@JN 花样年华---保额大于等于10000，最低单位为1000
		if(Riskcode=='@JN'){ 
			if(Amnt<500000){
				alert("险种为花样年华，最低保额不能低于50万");
				$("#amnt").focus();
				return false;
			}
			
			if(Amnt%1000 != 0){ //不能被1000整除
				alert("险种为花样年华,最小单位为1000");
				$("#amnt").focus();
				return false;
			}
		}
		
		//@MA 都会康健 ---保额大于等于10000
		if(Riskcode=='@MA'){
			if(Amnt<10000){
				alert("险种为都会康健，最低保额不能低于10000");
				$("#amnt").focus();
				return false;
			}
		}
		
		//@JC 都会金生(教育) --- 期交大于1000，趸交大于10000
		if(Riskcode=='@JC'){
			if($("#payintv").val()=='S'){
				if(Amnt<10000){
					alert("险种为都会金生(教育)，缴费方式为趸交，最低保额不能低于10000");
					$("#amnt").focus();
					return false;
				}
			}else{
				if(Amnt<1000){
					alert("险种为都会金生(教育)，缴费方式为期交，最低保额不能低于1000");
					$("#amnt").focus();
					return false;
				}
			}
		}
		
		//@JD 都会金生(财富) ---期交大于1000，趸交大于10000
		if(Riskcode=='@JD'){
			if($("#payintv").val()=='S'){
				if(Amnt<10000){
					alert("险种为都会金生(财富)，缴费方式为趸交，最低保额不能低于10000");
					$("#amnt").focus();
					return false;
				}
			}else{
				if(Amnt<1000){
					alert("险种为都会金生(财富)，缴费方式为期交，最低保额不能低于1000");
					$("#amnt").focus();
					return false;
				}
			}
		}
		
		//@JE 都会金生(退休) ---期交大于1000，趸交大于10000
		if(Riskcode=='@JE'){
			if($("#payintv").val()=='S'){
				if(Amnt<10000){
					alert("险种为都会金生(退休)，缴费方式为趸交，最低保额不能低于10000");
					$("#amnt").focus();
					return false;
				}
			}else{
				if(Amnt<1000){
					alert("险种为都会金生(退休)，缴费方式为期交，最低保额不能低于1000");
					$("#amnt").focus();
					return false;
				}
			}
		}
		//@SD 都会传承  保额大于等于1000000
		if(Riskcode=='@SD'){
			if(Amnt<1000000){
				alert("险种为都会传承，最低保额不能低于100万");
				$("#amnt").focus();
				return false;
			}
		}
		//@SC 都会长青  保费大于等于30000
		if(Riskcode=='@SC'){
			if(parseInt($("#prem").val())<30000){
				alert("险种为都会长青，最低保费不能低于30000");
				$("#prem").focus();
				return false;
			}
		}
		
		/**
		 * 险种对匹配相应的年龄
		 * 
		 * */
		
		//当前日期
		var today = new Date();
		todayFullYear = today.getFullYear();
		todayMonth = parseInt(today.getMonth())+1;
		todayDate = today.getDate();
		//投保人生日
		var LCInsuredbirthday = $("#LCInsuredbirthday").val().split("-");
		var LCInsuredbirthdayYear = LCInsuredbirthday[0];
		var LCInsuredbirthdayMonth = LCInsuredbirthday[1];
		var LCInsuredbirthdayDate = LCInsuredbirthday[2];
		//获取当前的被保人生日的天数
		var days = timeElapse(new Date($("#LCInsuredbirthday").val())); 
		
		
		//都汇传承--- 18-58 years old
		if($("#riskcode").val()=="@SD"){
			//判断年龄不能小于18周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))<18){
				alert("险种为都汇传承，被保人年龄不能小于18周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//年刚好相差18，判断月	
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==18){
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))<0){
					alert("险种为都汇传承，被保人年龄不能小于18周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//月份相同，判断日期
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))<0){
						alert("险种为都汇传承，被保人年龄不能小于18周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			//判断年龄大于58周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>59){
				alert("险种为都汇传承，被保人年龄不能大于58周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于58周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==59){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都汇传承，被保人年龄不能大于58周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都汇传承，被保人年龄不能大于58周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			
		}
		
		//花样年华--- 18-60 years old
		if($("#riskcode").val()=="@JN"){
			//判断年龄不能小于18周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))<18){
				alert("险种为花样年华，被保人年龄不能小于18周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//年刚好相差18，判断月	
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==18){
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))<0){
					alert("险种为花样年华，被保人年龄不能小于18周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//月份相同，判断日期
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))<0){
						alert("险种为花样年华，被保人年龄不能小于18周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			//判断年龄大于60周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>61){
				alert("险种为花样年华，被保人年龄不能大于60周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于60周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==61){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为花样年华，被保人年龄不能大于60周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为花样年华，被保人年龄不能大于60周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			
		}
		
		//都汇金生(教育)--- 30day-10years old
		if($("#riskcode").val()=="@JC"){
			if(days<30){
				alert("险种为都汇金生(教育)，被保人年龄不能小于30天");
				$("#LCInsuredbirthday").focus();
				return false;
			}
			
			//判断年龄大于11周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>11){
				alert("险种为都汇金生(教育)，被保人年龄不能大于11周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于55周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==11){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都汇金生(教育)，被保人年龄不能大于11周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都汇金生(教育)，被保人年龄不能大于11周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
		}
		
		//都汇金生(退休)--- 30-55years old
		if($("#riskcode").val()=="@JE"){
			//判断年龄不能小于30周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))<30){
				alert("险种为都汇金生(退休)，被保人年龄不能小于30周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//年刚好相差30，判断月	
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==30){
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))<0){
					alert("险种为都汇金生(退休)，被保人年龄不能小于30周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//月份相同，判断日期
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))<0){
						alert("险种为都汇金生(退休)，被保人年龄不能小于30周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			//判断年龄大于55周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>56){
				alert("险种为都汇金生(退休)，被保人年龄不能大于55周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于55周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==56){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都汇金生(退休)，被保人年龄不能大于55周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都汇金生(退休)，被保人年龄不能大于55周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			
		}
		//都汇金生(财富)--- 11-55years old
		if($("#riskcode").val()=="@JD"){
			//判断年龄不能小于11周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))<11){
				alert("险种为都汇金生(财富)，被保人年龄不能小于11周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//年刚好相差31，判断月	
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==11){
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))<0){
					alert("险种为都汇金生(财富)，被保人年龄不能小于11周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//月份相同，判断日期
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))<0){
						alert("险种为都汇金生(财富)，被保人年龄不能小于11周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			//判断年龄大于55周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>56){
				alert("险种为都汇金生(财富)，被保人年龄不能大于55周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于55周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==56){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都汇金生(财富)，被保人年龄不能大于55周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都汇金生(财富)，被保人年龄不能大于55周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
			
		}
		
		//都会长青--- 30day-65years old
		if($("#riskcode").val()=="@SC"){
			if(days<30){
				alert("险种为都会长青，被保人年龄不能小于30天");
				$("#LCInsuredbirthday").focus();
				return false;
			}
			
			
			//判断年龄大于65周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>66){
				alert("险种为都会长青，被保人年龄不能大于65周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于65周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==66){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都会长青，被保人年龄不能大于65周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都会长青，被保人年龄不能大于65周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
		}
		//都汇重疾险--- 30day-60years old
		if($("#riskcode").val()=="@MA"){
			if(days<30){
				alert("险种为都汇重疾险，被保人年龄不能小于30天");
				$("#LCInsuredbirthday").focus();
				return false;
			}
			
			//判断年龄大于60周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>61){
				alert("险种为都汇重疾险，被保人年龄不能大于60周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于70周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==61){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为都汇重疾险，被保人年龄不能大于60周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为都汇重疾险，被保人年龄不能大于60周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
		}
		
		//财富精选年金保险（投资连结型，2017）--- 30day-70years old
		if($("#riskcode").val()=="@JZ"){
			if(days<30){
				alert("险种为财富精选年金保险，被保人年龄不能小于30天");
				$("#LCInsuredbirthday").focus();
				return false;
			}
			
			//判断年龄大于70周岁
			if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))>71){
				alert("险种为财富精选年金保险，被保人年龄不能大于70周岁");
				$("#LCInsuredbirthday").focus();
				return false;
			//如果年龄等于70周岁，判断月份
			}else if((parseInt(todayFullYear)-parseInt(LCInsuredbirthdayYear))==71){
				//相差大于0---表示生日已过
				if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))>0){
					alert("险种为财富精选年金保险，被保人年龄不能大于70周岁");
					$("#LCInsuredbirthday").focus();
					return false;
				//如果生日就在本月，判断日期是否达到	
				}else if((parseInt(todayMonth)-parseInt(LCInsuredbirthdayMonth))==0){
					//生日已过
					if((parseInt(todayDate)-parseInt(LCInsuredbirthdayDate))>0){
						alert("险种为财富精选年金保险，被保人年龄不能大于70周岁");
						$("#LCInsuredbirthday").focus();
						return false;
					}
				}
			}
		
		}		
		return true;
	}

	//税收信息校验
	function revenueValidata(){
		
		if($("#statement").find("option:selected").val()=="0"){
			var id="statement";
			var msg="请选择投保人声明";
			return tips(id,msg);
		}
		
		if($("#statement").find("option:selected").val()=="2"||$("#statement").find("option:selected").val()=="3"){
			if($("#firstname").val()==""||$("#firstname").val()==null){
				var id="firstname";
				var msg="请输入姓(英文或拼音)";
				return tips(id,msg);
			}
			
			var str = /^[A-Za-z]+$/;
			if(!str.test($("#firstname").val().replace(/\s/g, ""))){
				var id="firstname";
				var msg="请输入英语或者拼音的姓";
				return tips(id,msg);
			}
			
			if($("#lastname").val()==""||$("#lastname").val()==null){
				var id="lastname";
				var msg="请输入名(英文或拼音)";
				return tips(id,msg);
			}
			
			if(!str.test($("#lastname").val().replace(/\s/g, ""))){
				var id="lastname";
				var msg="请输入英语或者拼音的名";
				return tips(id,msg);
			}
			
			if($("#living_isscountry").val()==""||$("#living_isscountry").val()==null){
				var id="living_isscountry";
				var msg="请输入现居国家";
				return tips(id,msg);
			}
			
			if(!str.test($("#living_isscountry").val().replace(/\s/g, ""))){
				var id="living_isscountry";
				var msg="请输入英语或者拼音的现居国家";
				return tips(id,msg);
			}
			
			if($("#living_province").val()==""||$("#living_province").val()==null){
				var id="living_province";
				var msg="请输入现居省份";
				return tips(id,msg);
			}
			
			if(!str.test($("#living_province").val().replace(/\s/g, ""))){
				var id="living_province";
				var msg="请输入英语或者拼音的现居省份";
				return tips(id,msg);
			}
			
			if($("#living_city").val()==""||$("#living_city").val()==null){
				var id="living_city";
				var msg="请输入现居市";
				return tips(id,msg);
			}
			
			if(!str.test($("#living_city").val().replace(/\s/g, ""))){
				var id="living_city";
				var msg="请输入英语或者拼音的现居市";
				return tips(id,msg);
			}
			
			if($("#living_address").val()==""||$("#living_address").val()==null){
				var id="living_address";
				var msg="请输入现居地址";
				return tips(id,msg);
			}
			
			if(!str.test($("#living_address").val().replace(/\s/g, ""))){
				var id="living_address";
				var msg="请输入英语或者拼音的现居地址";
				return tips(id,msg);
			}
			
			if($("#ennativeheath_isscountry").val()==""||$("#ennativeheath_isscountry").val()==null){
				var id="ennativeheath_isscountry";
				var msg="请输入英文出生国家";
				return tips(id,msg);
			}
			
			if(!str.test($("#ennativeheath_isscountry").val().replace(/\s/g, ""))){
				var id="ennativeheath_isscountry";
				var msg="请输入英语或者拼音的出生国家";
				return tips(id,msg);
			}
			
			if($("#ennativeheath_province").val()==""||$("#ennativeheath_province").val()==null){
				var id="ennativeheath_province";
				var msg="请输入英文出生省份";
				return tips(id,msg);
			}
			
			if(!str.test($("#ennativeheath_province").val().replace(/\s/g, ""))){
				var id="ennativeheath_province";
				var msg="请输入英语或者拼音的出生省";
				return tips(id,msg);
			}
			
			if($("#ennativeheath_city").val()==""||$("#ennativeheath_city").val()==null){
				var id="ennativeheath_city";
				var msg="请输入英文出生市";
				return tips(id,msg);
			}
			
			if(!str.test($("#ennativeheath_city").val().replace(/\s/g, ""))){
				var id="ennativeheath_city";
				var msg="请输入英语或者拼音的出生市";
				return tips(id,msg);
			}
			
			if($("#ennativeheath_address").val()==""||$("#ennativeheath_address").val()==null){
				var id="ennativeheath_address";
				var msg="请输入英文出生地址";
				return tips(id,msg);
			}
			
			if(!str.test($("#ennativeheath_address").val().replace(/\s/g, ""))){
				var id="ennativeheath_address";
				var msg="请输入英语或者拼音的出生地址";
				return tips(id,msg);
			}
			
			if(($("#residentcountry0").val()==""||$("#residentcountry0").val()==null) && ($("#residentcountry1").val()==""||$("#residentcountry1").val()==null) && ($("#residentcountry2").val()==""||$("#residentcountry2").val()==null)){
				var id="residentcountry0";
				var msg="请输入税收居民国";
				return tips(id,msg);
			}else{
				//税收居民国不为空  且没有解释原因
				if($("#reason").val()!="1" && $("#reason").val()!="2"){
					//如果存在纳税人识别号为空
					if(!($("#residentcountry0").val()==""||$("#residentcountry0").val()==null)){
						if(($("#residentnumber0").val()==""||$("#residentnumber0").val()==null)){
							var id="residentnumber0";
							var msg="请输入纳税人识别号码，如果没有请选择原因";
							return tips(id,msg);
						}
					}
					
					if(!($("#residentcountry1").val()==""||$("#residentcountry1").val()==null)){
						if(($("#residentnumber1").val()==""||$("#residentnumber1").val()==null)){
							var id="residentnumber1";
							var msg="请输入纳税人识别号码，如果没有请选择原因";
							return tips(id,msg);
						}
					}
					
					if(!($("#residentcountry2").val()==""||$("#residentcountry2").val()==null)){
						if(($("#residentnumber2").val()==""||$("#residentnumber2").val()==null)){
							var id="residentnumber2";
							var msg="请输入纳税人识别号码，如果没有请选择原因";
							return tips(id,msg);
						}
					}
					
				}
			}
		}
		
		if($("#reason").val()=="2"){
			if($("#reason2desc").val()==""||$("#reason2desc").val()==null){
				var id="reason2desc";
				var msg="请解释具体原因";
				return tips(id,msg);
			}
			
			//限制长度校验，因为投保单打印模板原因，不得超过40个中文或者80个英文，一个等于两个英文
			var str = $("#reason2desc").val()
			var temp = str.replace(/([^\u0000-\u00FF])/g, "aa");
			if(temp.length>80){
				var id="reason2desc";
				var msg="具体原因过长，请重新输入";
				return tips(id,msg);
			}
			
		}
		return true;
	}
	//附加险校验
	function additionalRiskValidata(){
		//如果附加险1不为空
		if($("#riskcode1").val()!="" && $("#riskcode1").val()!=null){
			
			if($("#prem1").val()==null||$("#prem1").val()==""){
				var id="prem1";
				var msg="请输入保费";
				return tips(id,msg);
			}
			
			if($("#amnt1").val()==null || $("#amnt1").val()==""){
				var id="amnt1";
				var msg="请输入基本保险金额";
				return tips(id,msg);
			}
			
			if($("#insuyear1").val()==null || $("#insuyear1").val()==""){
				var id="insuyear1";
				var msg="请选择保险期间";
				return tips(id,msg);
			}
			
			if($("#insuyearflag1").val()==null || $("#insuyearflag1").val()==""){
				var id="insuyearflag1";
				var msg="请选择保险期间分类";
				return tips(id,msg);
			}
			
			if($("#payendyear1").val()==null || $("#payendyear1").val()==""){
				var id="payendyear1";
				var msg="请选择缴费期间";
				return tips(id,msg);
			}
			
			if($("#payendyearflag1").val()==null || $("#payendyearflag1").val()==""){
				var id="payendyearflag1";
				var msg="请选择缴费期间分类";
				return tips(id,msg);
			}
			
			if($("#getform1").val()==null || $("#getform1").val()==""){
				var id="getform1";
				var msg="请选择年金领取方式";
				return tips(id,msg);
			}
			
			if($("#payintv1").val()==null || $("#payintv1").val()==""){
				var id="payintv1";
				var msg="请选择缴费方式";
				return tips(id,msg);
			}
		}
		
		//如果附加险2不为空
		if($("#riskcode2").val()!="" && $("#riskcode2").val()!=null){
			
			if($("#prem2").val()==null||$("#prem2").val()==""){
				var id="prem2";
				var msg="请输入保费";
				return tips(id,msg);
			}
			
			if($("#amnt2").val()==null || $("#amnt2").val()==""){
				var id="amnt2";
				var msg="请输入基本保险金额";
				return tips(id,msg);
			}
			
			if($("#insuyear2").val()==null || $("#insuyear2").val()==""){
				var id="insuyear2";
				var msg="请选择保险期间";
				return tips(id,msg);
			}
			
			if($("#insuyearflag2").val()==null || $("#insuyearflag2").val()==""){
				var id="insuyearflag2";
				var msg="请选择保险期间分类";
				return tips(id,msg);
			}
			
			if($("#payendyear2").val()==null || $("#payendyear2").val()==""){
				var id="payendyear2";
				var msg="请选择缴费期间";
				return tips(id,msg);
			}
			
			if($("#payendyearflag2").val()==null || $("#payendyearflag2").val()==""){
				var id="payendyearflag2";
				var msg="请选择缴费期间分类";
				return tips(id,msg);
			}
			
			if($("#getform2").val()==null || $("#getform2").val()==""){
				var id="getform2";
				var msg="请选择年金领取方式";
				return tips(id,msg);
			}
			
			if($("#payintv2").val()==null || $("#payintv2").val()==""){
				var id="payintv2";
				var msg="请选择缴费方式";
				return tips(id,msg);
			}
		
		}
		
		//如果附加险3不为空
		if($("#riskcode3").val()!="" && $("#riskcode3").val()!=null){
			if($("#prem3").val()==null||$("#prem3").val()==""){
				var id="prem3";
				var msg="请输入保费";
				return tips(id,msg);
			}
			
			if($("#amnt3").val()==null || $("#amnt3").val()==""){
				var id="amnt3";
				var msg="请输入基本保险金额";
				return tips(id,msg);
			}
			
			if($("#insuyear3").val()==null || $("#insuyear3").val()==""){
				var id="insuyear3";
				var msg="请选择保险期间";
				return tips(id,msg);
			}
			
			if($("#insuyearflag3").val()==null || $("#insuyearflag3").val()==""){
				var id="insuyearflag3";
				var msg="请选择保险期间分类";
				return tips(id,msg);
			}
			
			if($("#payendyear3").val()==null || $("#payendyear3").val()==""){
				var id="payendyear3";
				var msg="请选择缴费期间";
				return tips(id,msg);
			}
			
			if($("#payendyearflag3").val()==null || $("#payendyearflag3").val()==""){
				var id="payendyearflag3";
				var msg="请选择缴费期间分类";
				return tips(id,msg);
			}
			
			if($("#getform3").val()==null || $("#getform3").val()==""){
				var id="getform3";
				var msg="请选择年金领取方式";
				return tips(id,msg);
			}
			
			if($("#payintv3").val()==null || $("#payintv3").val()==""){
				var id="payintv3";
				var msg="请选择缴费方式";
				return tips(id,msg);
			}
		
		}
	}
	
//非投连险告知校验	
function informValidata(){
	
	if($("#select1").val()==null || $("#select1").val()==""){ //被保人是否出去旅游
		var id="select1";
		var msg="请选择被保人是否出去旅游";
		return tips(id,msg);
	}
	
	if($("#select2").val()==null || $("#select2").val()==""){ //投保人是否出去旅游
		var id="select2";
		var msg="请选择投保人是否出去旅游";
		return tips(id,msg);
	}
	
	
	if($("#select106").val()==null || $("#select106").val()==""){ //被保人是否计划进行危险活动
		var id="select106";
		var msg="请选择被保人是否计划进行危险活动";
		return tips(id,msg);
	}
	if($("#select107").val()==null || $("#select107").val()==""){ //被保人是否计划进行危险活动
		var id="select107";
		var msg="请选择投保人是否计划进行危险活动";
		return tips(id,msg);
	}
	
	if($("#select108").val()==null || $("#select108").val()==""){ //被保人是否失明，聋哑等
		var id="select108";
		var msg="请选择被保人是否被保人是否失明，聋哑等";
		return tips(id,msg);
	}
	if($("#select109").val()==null || $("#select109").val()==""){ //投保人是否失明，聋哑等
		var id="select109";
		var msg="请选择投保人是否被保人是否失明，聋哑等";
		return tips(id,msg);
	}
	
	//var regu = /^[1-9]\d*$/; //只能输入数字进行校验
	//只能输入数字，并且不能以0开头，只能保留两位小数点
	var regu = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/; 
	
	if($("#InsuHight").val()==null || $("#InsuHight").val()==""){ //被保人身高
		var id="InsuHight";
		var msg="请输入被保人身高";
		return tips(id,msg);
	}
	
	if(!regu.test($("#InsuHight").val())){
		var id="InsuHight";
		var msg="被保人身高格式不正确，请重新输入";
		return tips(id,msg);
	}
	
	if($("#AppHeight").val()==null || $("#AppHeight").val()==""){ //投保人身高
		var id="AppHeight";
		var msg="请输入投保人身高";
		return tips(id,msg);
	}
	if(!regu.test($("#AppHeight").val())){
		var id="AppHeight";
		var msg="投保人身高格式不正确，请重新输入";
		return tips(id,msg);
	}
	
	if($("#InsuWeight").val()==null || $("#InsuWeight").val()==""){ //被保人体重
		var id="InsuWeight";
		var msg="请输入被保人体重";
		return tips(id,msg);
	}
	if(!regu.test($("#InsuWeight").val())){
		var id="InsuWeight";
		var msg="被保人体重格式不正确，请重新输入";
		return tips(id,msg);
	}
	
	if($("#AppWeight").val()==null || $("#AppWeight").val()==""){ //投保人体重
		var id="AppWeight";
		var msg="请输入投保人体重";
		return tips(id,msg);
	}
	if(!regu.test($("#AppWeight").val())){
		var id="AppWeight";
		var msg="投保人体重格式不正确，请重新输入";
		return tips(id,msg);
	}
	
	if($("#select3").val()==null || $("#select3").val()==""){ //被保人是否有亲属因疾病60岁前身故
		var id="select3";
		var msg="请选择被保人是否有亲属因疾病60岁前身故";
		return tips(id,msg);
	}
	if($("#select110").val()==null || $("#select110").val()==""){ //投保人是否有亲属因疾病60岁前身故
		var id="select110";
		var msg="请选择投保人是否有亲属因疾病60岁前身故";
		return tips(id,msg);
	}
	
	if($("#select3").val()=='Y' ){ //被保人有亲属因疾病60岁前身故，需要输入患者以及疾病
		if($("#patient").val()==null || $("#patient").val()==""){ //患者
			var id="patient";
			var msg="被保人有亲属因疾病60岁前身故，请输入患者姓名";
			return tips(id,msg);
		}
		
		if($("#etiology").val()==null || $("#etiology").val()==""){ //疾病
			var id="etiology";
			var msg="被保人有亲属因疾病60岁前身故，请输入病因";
			return tips(id,msg);
		}
	}
	
	if($("#select111").val()==null || $("#select111").val()==""){ //被保人过去二年内是否曾因健康检查有异常
		var id="select111";
		var msg="请选择被保人过去二年内是否曾因健康检查有异常";
		return tips(id,msg);
	}
	if($("#select112").val()==null || $("#select112").val()==""){ //投保人过去二年内是否曾因健康检查有异常
		var id="select112";
		var msg="请选择投保人过去二年内是否曾因健康检查有异常";
		return tips(id,msg);
	}
	
	if($("#select113").val()==null || $("#select113").val()==""){ //被保人过去三个月内是否曾因受伤或生病接受医生治疗等
		var id="select113";
		var msg="请选择被保人过去三个月内是否曾因受伤或生病接受医生治疗等";
		return tips(id,msg);
	}
	if($("#select114").val()==null || $("#select114").val()==""){ //投保人过去三个月内是否曾因受伤或生病接受医生治疗等
		var id="select114";
		var msg="请选择投保人过去三个月内是否曾因受伤或生病接受医生治疗等";
		return tips(id,msg);
	}
	
	if($("#select115").val()==null || $("#select115").val()==""){ //被保人过去或现在是否患有下列“注一”之疾病等
		var id="select115";
		var msg="请选择被保人过去或现在是否患有下列“注一”之疾病等";
		return tips(id,msg);
	}
	if($("#select116").val()==null || $("#select116").val()==""){ //投保人过去或现在是否患有下列“注一”之疾病等
		var id="select116";
		var msg="请选择投保人过去或现在是否患有下列“注一”之疾病等";
		return tips(id,msg);
	}
	
	if($("#select117").val()==null || $("#select117").val()==""){ //被保人过去二年内是否曾患有下列“注二”之疾病
		var id="select117";
		var msg="请选择被保人过去二年内是否曾患有下列“注二”之疾病";
		return tips(id,msg);
	}
	if($("#select118").val()==null || $("#select118").val()==""){ //投保人过去二年内是否曾患有下列“注二”之疾病
		var id="select118";
		var msg="请选择投保人过去二年内是否曾患有下列“注二”之疾病";
		return tips(id,msg);
	}
	
	/*if($("#isPregnant").val()==null || $("#isPregnant").val()==""){ //是否怀孕
		var id="isPregnant";
		var msg="请选择被保人是否怀孕";
		return tips(id,msg);
	}*/
	
	if($("#isPregnant").val()=="Y"){ //是否怀孕
		if($("#PregnantTime").val()==null || $("#PregnantTime").val()==""){ //时间
			var id="PregnantTime";
			var msg="被保人怀孕，请输入怀孕时间";
			return tips(id,msg);
		}
	}
	
	if($("#select119").val()==null || $("#select119").val()==""){ //保险人出生时是否难产或早产等
		var id="select119";
		var msg="请选择被保险人出生时是否难产或早产等";
		return tips(id,msg);
	}
	
	if($("#select120").val()==null || $("#select120").val()==""){ //被保险人是否被告知患有先天性疾病等
		var id="select120";
		var msg="请选择被保险人是否被告知患有先天性疾病等";
		return tips(id,msg);
	}
	
	if($("#select4").val()==null || $("#select4").val()==""){ //是否已购买或正申请投保其他保险公司的产品
		var id="select4";
		var msg="请选择是否已购买或正申请投保其他保险公司的产品";
		return tips(id,msg);
	}
	
	
	if($("#select5").val()==null || $("#select5").val()==""){ //被保人被保的人寿保险、意外或健康保险是否曾被拒保
		var id="select5";
		var msg="请选择被保人被保的人寿保险、意外或健康保险是否曾被拒保";
		return tips(id,msg);
	}
	if($("#select121").val()==null || $("select121").val()==""){ //投保人被保的人寿保险、意外或健康保险是否曾被拒保
		var id="select121";
		var msg="请选择投保人被保的人寿保险、意外或健康保险是否曾被拒保";
		return tips(id,msg);
	}
	
	if($("#select5").val()=="Y"){ //被保人被保的人寿保险、意外或健康保险曾被拒保
		if($("#riskName").val()==null || $("#riskName").val()==""){ //保险品种
			var id="riskName";
			var msg="已被保人被保的人寿保险、意外或健康保险曾被拒保，请输入保险品种";
			return tips(id,msg);
		}
		if($("#dated").val()==null || $("#dated").val()==""){ //保险日期
			var id="dated";
			var msg="已被保人被保的人寿保险、意外或健康保险曾被拒保，请输入保险日期";
			return tips(id,msg);
		}
		if($("#insuReason").val()==null || $("#insuReason").val()==""){ //原因
			var id="insuReason";
			var msg="已被保人被保的人寿保险、意外或健康保险曾被拒保，请输入原因";
			return tips(id,msg);
		}
	}
	var temp1 = ($("#select122").val()=='N'||$("#select122").val()=='Y')?$("#select122").val():"";
	if(temp1==""){ //保费额度是否大于或等于投保人保费预算的150
		var id="select122";
		var msg="请选择保费额度是否大于或等于投保人保费预算的150";
		return tips(id,msg);
	}
	var temp = ($("#select123").val()=='N'||$("#select123").val()=='Y')?$("#select123").val():"";
	if(temp==""){ //被保人是否拥有美国绿卡护照等
		var id="select123";
		var msg="请选择被保人FATCA告知事项";
		return tips(id,msg);
	}
	
	if($("#select124").val()==null || $("select124").val()==""){ //投保人是否拥有美国绿卡护照等
		var id="select124";
		var msg="请选择投保人FATCA告知事项";
		return tips(id,msg);
	}
	return true;
}


//投连险告知校验	
function informValidata1(){
	
	if($("#select6").val()==null || $("#select6").val()==""){ //被保人最近一年是否出去旅游
		var id="select6";
		var msg="请选择被保人最近一年是否出去旅游";
		return tips(id,msg);
	}
	
	if($("#select100").val()==null || $("#select100").val()==""){ //被保人是否准备参加危险活动
		var id="select100";
		var msg="请选择被保人是否准备参加危险活动";
		return tips(id,msg);
	}
	
	if($("#select101").val()==null || $("#select101").val()==""){ //被保人身体是否有失明、聋哑等
		var id="select101";
		var msg="请选择被保人身体是否有失明、聋哑等";
		return tips(id,msg);
	}
	
	if($("#select102").val()==null || $("#select102").val()==""){ //请选择被保人是否曾住院10天以上
		var id="select102";
		var msg="请选择被保人是否曾住院10天以上";
		return tips(id,msg);
	}
	
	if($("#select7").val()==null || $("#select7").val()==""){ //被保人是否曾被拒保
		var id="select7";
		var msg="请选择被保人是否曾被拒保";
		return tips(id,msg);
	}
	
	if($("#select7").val() =='Y'){
		if($("#riskName1").val()==null || $("#riskName1").val()==""){
			var id="riskName1";
			var msg="请选择被保人被拒保的险种名称";
			return tips(id,msg);
		}
		
		if($("#dated1").val()==null || $("#dated1").val()==""){
			var id="dated1";
			var msg="请输入被保人被拒保的时间";
			return tips(id,msg);
		}
		
		if($("#insuReason1").val()==null || $("#insuReason1").val()==""){
			var id="insuReason1";
			var msg="请输入被保人被拒保的原因";
			return tips(id,msg);
		}
	}
	
	if($("#select103").val()==null || $("#select103").val()==""){ //保费额度是否大于或等于被保人保费预算的150%
		var id="select103";
		var msg="请选择保费额度是否大于或等于投保人保费预算的150%";
		return tips(id,msg);
	}
	
	if($("#select104").val()==null || $("#select104").val()==""){ //被保人FATCA告知事项
		var id="select104";
		var msg="请选择被保人FATCA告知事项";
		return tips(id,msg);
	}
	
	if($("#select105").val()==null || $("#select105").val()==""){ //投保人FATCA告知事项
		var id="select105";
		var msg="请选择投保人FATCA告知事项";
		return tips(id,msg);
	}
	
	return true;
}

//按钮状态--1  投保单打印--Y，扣款--Y，延迟扣款--Y
function stateOfButton_1(){
	$("#save7").removeAttr("disabled");   // 扣款
	$("#save7").removeClass("btn btn-primaryis");
	$("#save7").addClass("btn btn-primary");
		
	$("#save9").removeAttr("disabled");  //延迟扣款
	$("#save9").removeClass("btn btn-primaryis");
	$("#save9").addClass("btn btn-primary");
	
	$("#save10").removeAttr("disabled");  //投保单打印
	$("#save10").removeClass("btn btn-primaryis");
	$("#save10").addClass("btn btn-primary");
	
	stateOfSaveButton();
}
//按钮状态--2  投保单打印--Y，扣款--Y，延迟扣款--N
function stateOfButton_2(){
	$("#save7").removeAttr("disabled");   // 扣款
	$("#save7").removeClass("btn btn-primaryis");
	$("#save7").addClass("btn btn-primary");
		
	$("#save9").attr("disabled",true); //延迟扣款
	$("#save9").removeClass("btn btn-primary");
	$("#save9").addClass("btn btn-primaryis");
	
	$("#save10").removeAttr("disabled");  //投保单打印
	$("#save10").removeClass("btn btn-primaryis");
	$("#save10").addClass("btn btn-primary");
	
	stateOfSaveButton();
}

//按钮状态--3  投保单打印--Y，扣款--N，延迟扣款--N
function stateOfButton_3(){
	$("#save7").attr("disabled",true);   // 扣款
	$("#save7").removeClass("btn btn-primary");
	$("#save7").addClass("btn btn-primaryis");
		
	$("#save9").attr("disabled",true); //延迟扣款
	$("#save9").removeClass("btn btn-primary");
	$("#save9").addClass("btn btn-primaryis");
	
	$("#save10").removeAttr("disabled"); //投保单打印
	$("#save10").removeClass("btn btn-primaryis");
	$("#save10").addClass("btn btn-primary");
	
	stateOfSaveButton();
}
//按钮状态--4  投保单打印--N，扣款--N，延迟扣款--N
function stateOfButton_4(){
	$("#save7").attr("disabled",true); // 扣款
	$("#save7").removeClass("btn btn-primary");
	$("#save7").addClass("btn btn-primaryis");
		
	$("#save9").attr("disabled",true); //延迟扣款
	$("#save9").removeClass("btn btn-primary");
	$("#save9").addClass("btn btn-primaryis");
	
	$("#save10").attr("disabled",true); //投保单打印
	$("#save10").removeClass("btn btn-primary");
	$("#save10").addClass("btn btn-primaryis");
}

//按钮状态--数据库异常  投保单打印--N，扣款--N，延迟扣款--N,其他保存按钮全部无法操作
function stateOfButton_other(){
	$("#save7").attr("disabled",true); // 扣款
	$("#save7").removeClass("btn btn-primary");
	$("#save7").addClass("btn btn-primaryis");
		
	$("#save9").attr("disabled",true); //延迟扣款
	$("#save9").removeClass("btn btn-primary");
	$("#save9").addClass("btn btn-primaryis");
	
	$("#save10").attr("disabled",true); //投保单打印
	$("#save10").removeClass("btn btn-primary");
	$("#save10").addClass("btn btn-primaryis");
	
	stateOfSaveButton();
}

//保存按钮不可操作
function stateOfSaveButton(){
	$("#additional").hide();//隐藏添加附加险按钮
	$("#save2").attr("disabled",true); //被保险人
	$("#save2").removeClass("btn btn-primary");
	$("#save2").addClass("btn btn-primaryis");
	
	$("#save3").attr("disabled",true); //被保险人
	$("#save3").removeClass("btn btn-primary");
	$("#save3").addClass("btn btn-primaryis");

	$("#save4").attr("disabled",true); //受益人信息
	$("#save4").removeClass("btn btn-primary");
	$("#save4").addClass("btn btn-primaryis");

	$("#addbene").hide(); //添加受益人
	$("#save5").attr("disabled",true); //产品信息保存
	$("#save5").removeClass("btn btn-primary");
	$("#save5").addClass("btn btn-primaryis");
		
	$("#save0").attr("disabled",true); //产品信息保存
	$("#save0").removeClass("btn btn-primary");
	$("#save0").addClass("btn btn-primaryis");

	$("#notify").attr("disabled",true);//告知录入
	$("#notify").removeClass("btn btn-primary");
	$("#notify").addClass("btn btn-primaryis");
	
	$("#addTable").attr("disabled",true);//告知录入
	$("#addTable").removeClass("btn btn-primary");
	$("#addTable").addClass("btn btn-primaryis");
		
	$("#delTable").attr("disabled",true);//告知录入
	$("#delTable").removeClass("btn btn-primary");
	$("#delTable").addClass("btn btn-primaryis");
	
	$("#save6").attr("disabled",true);//投连险---试算
	$("#save6").removeClass("btn btn-primary");
	$("#save6").addClass("btn btn-primaryis");
		
	$("#save8").attr("disabled",true);//非投连险---试算
	$("#save8").removeClass("btn btn-primary");
	$("#save8").addClass("btn btn-primaryis");
		
	$("#save1").attr("disabled",true);//试算
	$("#save1").removeClass("btn btn-primary");
	$("#save1").addClass("btn btn-primaryis");
		
	$("#save15").attr("disabled",true);//非投连险---告知
	$("#save15").removeClass("btn btn-primary");
	$("#save15").addClass("btn btn-primaryis");
		
	$("#save16").attr("disabled",true);//投连险---告知
	$("#save16").removeClass("btn btn-primary");
	$("#save16").addClass("btn btn-primaryis");
	
	$("#fwv-2a").attr("disabled",true); //投保人编辑按钮
	$("#fwv-2a").removeClass("btn btn-primary");
	$("#fwv-2a").addClass("btn btn-primaryis");
	
	$("#fwv-5a").attr("disabled",true); //税收编辑按钮
	$("#fwv-5a").removeClass("btn btn-primary");
	$("#fwv-5a").addClass("btn btn-primaryis");
	
	$("#fwv-3a").attr("disabled",true); //被保人编辑按钮
	$("#fwv-3a").removeClass("btn btn-primary");
	$("#fwv-3a").addClass("btn btn-primaryis");
	
	$("#fwv-4a").attr("disabled",true); //受益人编辑按钮
	$("#fwv-4a").removeClass("btn btn-primary");
	$("#fwv-4a").addClass("btn btn-primaryis");
	
	$("#fwv-7a").attr("disabled",true); //主险编辑按钮
	$("#fwv-7a").removeClass("btn btn-primary");
	$("#fwv-7a").addClass("btn btn-primaryis");
	
	$("#fwv-22a").attr("disabled",true); //附加险编辑按钮
	$("#fwv-22a").removeClass("btn btn-primary");
	$("#fwv-22a").addClass("btn btn-primaryis");
	
	$("#fwv-20a").attr("disabled",true); //非投连险告知编辑按钮
	$("#fwv-20a").removeClass("btn btn-primary");
	$("#fwv-20a").addClass("btn btn-primaryis");
	
	$("#fwv-21a").attr("disabled",true); //投连险告知编辑按钮
	$("#fwv-21a").removeClass("btn btn-primary");
	$("#fwv-21a").addClass("btn btn-primaryis");
}
//页面状态 p2---进入扣款页面
function stateOfPage(){
	$("#fwv-1s").val("1");
	$("#fwv-2s").val("1");
	$("#fwv-5s").val("1");
	$("#fwv-3s").val("1");
	$("#fwv-4s").val("1");
	$("#fwv-7s").val("1");
	$("#fwv-22s").val("1");
	$("#fwv-21s").val("1");
	$("#fwv-20s").val("1");
	$("#fwv-6s").val("1");
	$('#infoUl a[href="#fwv-6"]').tab('show');
}

$("#field-15").blur(function(){
	$("#isLongItem").removeAttr("checked");//去除选中按钮
});

//注一疾病点击显示模态框事件
$("#annotation1").click(function(){
	$('#myModal1').attr('class', "modal show");
});

//注二疾病点击显示模态框事件
$("#annotation2").click(function(){
	$('#myModal2').attr('class', "modal show");
});

//点击关闭按钮关闭模态框
$('.modal-footer button').on('click', function() {
	$('#myModal1').attr('class', "modal flad");
	$('#myModal2').attr('class', "modal flad");
})
//点击X关闭模态框
$('.modal-header button').on('click', function() {
	$('#myModal1').attr('class', "modal flad");
	$('#myModal2').attr('class', "modal flad");
})

//获取天数
function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	return days;
}

//税收页面--税收居民释义鼠标悬浮显示具体内容，移开关闭悬浮窗
$("[rel=labelstatement]").popover({
	            trigger:'manual',
	            placement : 'bottom', 
	            title : '<div style="text-align:center;color:#4f4f4f; text-decoration:underline; font-size:14px;">税收居民身份释义</div>', 
	            html: 'true',
	            content : '<div id="popOverBox" style="font-size:14px;">'+'<span color:#4f4f4f>1. 本表所称中国税收居民是指在中国境内有住所，或者无住所而在境内居住满一年的个人。'+
	            '在中国境内有住所是指因户籍、家庭、经济利益关系而在中国境内习惯性居住。在境内居住满一年，是指在一个纳税年度中在中国境内居住365日。临时离境的，不扣减日数。'+
	            '临时离境，是指在一个纳税年度中一次不超过30日或者多次累积不超过90日的离境。<br>2. 本表所称非居民是指中国税收居民以外的个人。其他国家（地区）税收居民身'+
	            '份认定规则及纳税人识别号相关信息请参见国家税务总局网站。（http://www.chinatax.gov.cn）<br>3. 军人、武装警察无需填写此声明文件。</span></div>', 
	            animation: false
	        }).on("mouseenter", function () {
	                    var _this = this;
	                    $(this).popover("show");
	                    $(this).siblings(".popover").on("mouseleave", function () {
                        $(_this).popover('hide');
	                    });
	                }).on("mouseleave", function () {
	                    var _this = this;
	                    setTimeout(function () {
	                        if (!$(".popover:hover").length) {
	                            $(_this).popover("hide")
	                        }
	                    }, 100);
	                });

//非实时弹窗的转非实时按钮控制
$("#isNRealtime").click(function(){
	if($("#isNRealtime").is(":checked")==true){ //勾选,走非实时按钮可以点击
		$("#NRealtime").removeAttr("disabled"); 
		$("#NRealtime").removeClass("btn btn-primaryis");
		$("#NRealtime").addClass("btn btn-primary");
	}else{ //未勾选状态，按钮不可以点击
		$("#NRealtime").attr("disabled",true); 
		$("#NRealtime").removeClass("btn btn-primary");
		$("#NRealtime").addClass("btn btn-primaryis");
	}
});

//非实时弹窗点击返回录入,关闭窗口
$("#return2page").click(function(){
	$('#myModal3').attr('class', "modal flad"); //关闭弹窗
});

//非实时弹窗点击转非实时,关闭窗口，执行相应的方法
$("#NRealtime").click(function(){
	var proposalcontno = $("#field-2").val();
	$.ajax({
        url:path + '/newContApply/resetAppFlagStatus.do',  
        type: "POST",
        data: {"proposalcontno":proposalcontno,"status":"09"},
        dataType : "json",
        success: function(data){
        	//投保单状态更改为非实时---非实时只能打印投保单，扣款以及延迟扣款不能执行
        	if(data.success==true){
        		$.ajax({  //扣款成功后查询按钮状态
					type : "POST",
					url:path + '/newContEnter/selectStateOfButton.do', // 后台请求URL地址  
					data : {"proposalcontno":proposalcontno},
					dataType : "json",
					success:function(data) {
						if(data!=null){
							if(data.success==true){ //数据正确，返回按钮状态
								if(data.parm=="1"){
									stateOfButton_1();
								}else if(data.parm=="2"){
									stateOfButton_2();
								}else if(data.parm=="3"){
									stateOfButton_3();
								}else if(data.parm=="4"){
									stateOfButton_4();
								}
							}else{ //数据不正确，不能进行操作
								stateOfButton_other();
								alert(data.msg);
							}
						}
					}
				});
        		alert(data.msg);
        	}
        	else{
        		alert(data.msg);
        	}
        },
        error:function(){
        	closeds();
        	alert("重置状态失败");
        }
    }); 
	
	$('#myModal3').attr('class', "modal flad"); //关闭弹窗
});

//初始化非实时申请弹窗的状态，清除选中状态，按钮变成不可点击，清空div下面的提示内容
function initNRealtime(){
	$("#isNRealtime").attr("checked",false); //清除checkbox选中状态
	
	$("#NRealtime").attr("disabled",true); //转非实时按钮不可点击
	$("#NRealtime").removeClass("btn btn-primary");
	$("#NRealtime").addClass("btn btn-primaryis");
	
	$("#modalBody").empty(); //清空div下面的内容
}

//计算周岁，小于对应的值
function lessFullYear(birthDay){
	
	var today = new Date();
	todayFullYear = today.getFullYear();
	todayMonth = parseInt(today.getMonth())+1;
	todayDate = today.getDate();
	
	var birthDays = birthDay.split('-');//生日----也可以看做较早的日期
	var temp;
	
	var year = parseInt(todayFullYear)-parseInt(birthDays[0]); //计算年
	var month = parseInt(todayMonth)-parseInt(birthDays[1]); //计算月
	var day = parseInt(todayDate)-parseInt(birthDays[2]); //计算天
	
	if(month>0){  //如果过了生日的月份--年份相减的数字
		temp = year;
	}else if(month<0){   //如果没有到生日的月份--年份相减的数字-1
		temp = year-1;
	}else{   //如果刚好到生日的月份--继续判断日期
		if(day>=0){ //生日的月份，但是日期过了或者今天就是生日，年份相减的数字
			temp = year;
		}else{ //生日还没过，年份相减的数字-1
			temp = year-1;
		}
	}
	if(temp<0){ //有可能出现小于0，返回0
		return 0;
	}else{
		return temp;
	}
}


