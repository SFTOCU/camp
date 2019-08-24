var app = new Vue({
    el:"#app",
    data:{
        page:0,
        gifts:[
            {code:"gift1",content:"ハーゲンダッツ券(当選者多数)"},
            {code:"gift2",content:"Amazonギフト(当選者数名)"},
            {code:"gift3",content:"夢の国ペアチケット(当選者1名)"},
            {code:"gift4",content:"switch先生(当選者1名)"}
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
                  
        ]
    },
    methods:{
        nextpage:function(){
            if(this.page==3&&this.costSum==0)return alert("広報企画を選択してください！！");
        
            location.hash=(this.page+1);
        }
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
        }
    }
});

window.onload = function(){
    app.page = Number(location.hash.slice(1));
    window.onhashchange = function(){
        app.page=Number(location.hash.slice(1));
    };
};