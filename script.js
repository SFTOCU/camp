var app = new Vue({
    el:"#app",
    data:{
        page:0,
        weeks:["月","火","水","木","金"],
        bookNum:0,
        contributerList:[],
        custNums:[0,0,0,0,0,0,0,0,0,0],
        variables:[
            {
                name:"学部",
                options:{
                    0:"理系",
                    1:"文系"
                },
                length:2,
            },
            {
                name:"きっかけ",
                options:{
                    0:"Twi",
                    1:"Ins",
                    2:"ポス",
                    3:"友達",
                },
                length:4,
            },
            {
                name:"目的",
                options:{
                    0:"国際",
                    1:"処分",
                    2:"景品",
                },
                length:3,
            },
            {
                name:"景品",
                options:{
                    0:"ダッツ券",
                    1:"Amaギフ",
                    2:"夢の国",
                    3:"switch"
                },
                length:4,
            }
        ],
        oVariables:["寄付人数","寄付冊数","平均寄付冊数"],
        oVariable:0,
        eVariable1:0,
        eVariable2:0,
        gifts:[
            {num:0,code:"gift1",content:"ハーゲンダッツ券(当選者多数)"},
            {num:1,code:"gift2",content:"Amazonギフト(当選者数名)"},
            {num:2,code:"gift3",content:"夢の国ペアチケット(当選者1名)"},
            {num:3,code:"gift4",content:"switch先生(当選者1名)"}
        ],
        sgift:"undefind",
        concepts:[
            {content:"国際協力",value:""},
            {content:"教科書処分",value:""},
            {content:"豪華景品",value:""},
        ],
        events:[
            {
                soption:0, title:"Twitter広報", explanation:"Twittwerをよく見る人が寄付しやすくなる", options:[
                    {cost:0,option:"不実施"},
                    {cost:20,option:"低強度"},
                    {cost:30,option:"中強度"},
                    {cost:45,option:"高強度"},
            ]},
            {
                soption:0, title:"Instagram広報", explanation:"Instagramをよく見る人が寄付しやすくなる", options:[
                    {cost:0,option:"不実施"},
                    {cost:20,option:"低強度"},
                    {cost:30,option:"中強度"},
                    {cost:45,option:"高強度"},
            ]},
            {
                soption:0, title:"ポスター広報", explanation:"学内掲示のポスターをよく見る人が寄付しやすくなる", options:[
                    {cost:0,option:"不実施"},
                    {cost:20,option:"低強度"},
                    {cost:30,option:"中強度"},
                    {cost:45,option:"高強度"},
            ]},
            {
                soption:0, title:"ビラ配り", explanation:"多くの人に認知してもらえ、また、少し寄付しやすくなる",options:[
                    {cost:0,option:"不実施"},
                    {cost:25,option:"実施"},
            ]},
            {
                soption:0, title:"回収時呼び込み", explanation:"少し寄付しやすくなる",options:[
                    {cost:0,option:"不実施"},
                    {cost:15,option:"実施"},
            ]},
            {
                soption:0, title:"学部別広報", explanation:"指定の学部の人が寄付しやすくなる",options:[
                    {cost:0,option:"不実施"},
                    {cost:15,option:"理系"},
                    {cost:15,option:"文系"},
            ]},
            {
                soption:0, title:"友人紹介キャンペーン", explanation:"一定確率で寄付者が友人を連れてくる（寄付冊数2倍）",options:[
                    {cost:0,option:"不実施"},
                    {cost:25,option:"実施"},
            ]},
                  
        ],
        sifts:[
            0,0,0,0,0,0,0,0,0,0 
        ],
    },
    methods:{
        nextpage:function(){
            if(this.page==3&&this.costSum==0)return alert("広報企画を選択してください！！");
        
            location.hash=(this.page+1);
        },
        previouspage:function(){
            location.hash=(this.page-1);
        },
        restart:function(){
            location.hash = 1;
        },
        
    },
    computed:{
        conceptValueSum:function(){
            var buf = 0;
            for(var i=0; i<this.concepts.length; i++){
                if(this.concepts[i].value != "") buf += Number(this.concepts[i].value);
            }
            return buf
        },
        costSum:function(){
            var buf = 0;
            for(var i=0; i<this.events.length; i++){
                if(this.events[i].soption != "") buf += Number(this.events[i].options[this.events[i].soption].cost);
            }
            return buf
        },
        siftSum:function(){
            var buf = 0;
            for(var i=0; i<this.sifts.length; i++){
                buf += Number(this.sifts[i]);
            }
            return buf
        },
        payload:function(){
            var buf = {};
            buf.gift = this.gifts[this.sgift];
            buf.concepts = this.concepts;
            buf.events = [];
            for(var i=0; i<this.events.length; i++){                 
                buf.events.push({soption:this.events[i].soption,title:this.events[i].title});
            }
            buf.sifts = this.sifts;
            
            //alert(JSON.stringify(buf));
            
            return {data:JSON.stringify(buf)};
        },
        resultMatrixs:function(){
            var v1index = Number(this.eVariable1) + 1;
            var v1num = this.variables[this.eVariable1].length
            var v2index = Number(this.eVariable2) + 1;
            var v2num = this.variables[this.eVariable2].length
            
            var bufList = this.contributerList;
            
            var bufnum = mamkeZeroMatrix(v1num+1,v2num+1);
            var bufbook = mamkeZeroMatrix(v1num+1,v2num+1);
            var bufave = mamkeZeroMatrix(v1num+1,v2num+1);
            
            //console.log(JSON.stringify(bufList));
            //console.log(bufnum);
            for(i = 0;i<bufList.length;i++){
                var v1 = bufList[i][v1index];
                var v2 = bufList[i][v2index];
                //console.log([v1,v2]);
                bufnum[v1][v2] = Number(bufnum[v1][v2]) + 1;
                bufbook[v1][v2] = Number(bufbook[v1][v2]) + bufList[i][5];
            }
            //console.log(bufnum)
            
            for(var i=0; i<v1num; i++){
                var buf1 = 0;
                var buf2 = 0;
                for(var j = 0; j<v2num; j++){
                    buf1 += bufnum[i][j];
                    buf2 += bufbook[i][j];
                }
                bufnum[i][v2num] = buf1;
                bufbook[i][v2num] = buf2;
            }
            for(j=0; j<v2num+1; j++){
                buf1 = 0;
                buf2 = 0;
                for(i=0; i<v1num; i++){
                    buf1 += bufnum[i][j];
                    buf2 += bufbook[i][j];
                }
                console.log([buf1,buf2]);
                bufnum[v1num][j] = buf1;
                bufbook[v1num][j] = buf2;
            }
            for(i = 0; i<v1num+1; i++){
                for(j = 0;j<v2num+1;j++){
                    if(bufnum[i][j] > 0)bufave[i][j] = (bufbook[i][j]/bufnum[i][j]).toFixed(1);
                    else bufave[i][j] = 0;
                }
            }
             return [bufnum, bufbook, bufave];
        }
    }
});

window.onload = function(){
    app.page = Number(location.hash.slice(1));
    window.onhashchange = function(){
        app.page=Number(location.hash.slice(1));
        if(app.page==6)postData(app.payload);
    };
};

function postData(data){
    $.post("https://script.google.com/macros/s/AKfycbzR5-wI_YqfLv-5sGjDjlKzr-w0W5yAcs7V3klPpa6_8AVtlJ0/exec",
      data,
      function(dt){
        if(dt.error)alert(JSON.stringify(dt));
        if(dt.contributerList){
            location.hash = 7;
            app.contributerList = dt.contributerList;
            app.bookNum = dt.bookNum;
            app.custNums = dt.custNums;
            
        }
      }
    );
}

function mamkeZeroMatrix(row,col){
    var buf1 = [];
    for(var i = 0; i<row; i++){
            var buf2 = Array.apply(null, Array(col)).map(function () {return 0 });
            buf1.push(buf2);
    }
    return buf1
}