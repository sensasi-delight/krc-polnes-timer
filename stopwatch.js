var stat=[1, 0, 0, 0, 0, 0];
/* 	array 0 = countdown
	array 1 = countup
	array 2 = pause
	array 3 = resume
	array 4 = reset
	array 5 = cetak
*/

var min;
var sec;
var ms;

var a=0;
var b=0;
var tim=0;

var begin;
var mark;
var display;		
var loop;

var countd=5*1000; //waktu hitung mundur di set disini dalam milisecond 
var countu=15*60*1000; //waktu hitung maju di set disini dalam milisecond, contoh : saya ingin mengeset 5 detik jadi   (detik yg diinginkan)*(1 detik dalam milisecond) = 5*1000 = 5000 miliseconds

window.addEventListener("keyup", check, false);

function check(e)
{
	switch(e.keyCode)
	{
							//Keymap, untuk mengeset key masukan kode ascii nya. info kode ascii lihat disini http://www.theasciicode.com.ar/
		case 112:if(a==0){fin("A")};break; 	//112 = F1
		case 119:if(b==0){fin("B")};break; 	//119 = F8
		case 32:if(stat[0]==1){initCountDown()} //32 = Spasi
			else{initCountUp()};
			break;     	
		case 49:reset1();break;		   	//49 = 1
		case 50:reset2();break;		   	//50 = 2
		case 81:pause();break;			//81 = Q
		case 87:resume();break;			//82 = W
	}
}

//konversi dari ms -> min, sec, ms
function kalkulasi(conv)
{
	min=Math.floor(conv/60000);
	sec=Math.floor((conv-min*60000)/1000);
	ms=Math.floor((conv-sec*1000-min*60000)/10);
	
	min = checkTime(min);
	sec = checkTime(sec);
	ms = checkTime(ms);
}

//fungsi untuk hitung mundur. fungsi ini akan berhenti sampai waktu = 0
function countdown()
{
	now=new Date().getTime();
	counter=begin-now;
	
	kalkulasi(counter);
	
	document.getElementById('disp').innerHTML=min+":"+sec;
	document.getElementById('dispMs').innerHTML=ms;
	
	display=min+":"+sec+" "+ms;
	
	if(counter<=0)
	{ 	
		document.getElementById('disp').innerHTML="00:00";
		document.getElementById('dispMs').innerHTML="00";
		initCountUp();
		return;
	};
	
	loop = setTimeout(function(){countdown()},10);
}

//fungsi untuk hitung mundur. fungsi ini akan berhenti sampai waktu = countu(waktu maks)
function count()
{
	now=new Date().getTime();
	counter=now-begin;
	
	kalkulasi(counter);	
	
	if(tim==2)
	{
		stat=[0, 0, 0, 0, 1, 0];			
		return;
	}

	document.getElementById('disp').innerHTML=min+":"+sec;
	document.getElementById('dispMs').innerHTML=ms;
	
	display=min+":"+sec+" "+ms;
	

	if(counter>=countu)
	{ 
		document.getElementById("limit").play();
		kalkulasi(countu);
		document.getElementById('disp').innerHTML=min+":"+sec;
		document.getElementById('dispMs').innerHTML=ms;
		stat=[0, 0, 0, 0, 1, 0];
		
		if(a==0)
		{
			document.getElementById("finA").innerHTML=min+":"+sec+" 00";
		}
		
		if(b==0)
		{
			document.getElementById("finB").innerHTML=min+":"+sec+" 00";
		}
		return;
	};
	
	loop = setTimeout(function(){count()},10);
}

//fungsi ini untuk menambahkan "0" pada angka yang dibawah 10
function checkTime(i)
{
	if(i<10)
	{
		i="0"+i
	};
	return i;
}

//inisialisasi untuk hitung mundur
function initCountDown() 
{
	if(stat[0]==1)
	{
	begin=new Date().getTime()+(countd);
	stat=[0, 1, 1, 0, 1, 0];
	countdown();
	}
}

//inisialisasi untuk hitung maju
function initCountUp() 
{
	if(stat[1]==1)
	{
	document.getElementById('mode').innerHTML="";
	document.getElementById("prepare").play();
	
	setTimeout(function(){
	document.getElementById("start").play();
	stat=[0, 0, 1, 0, 1, 1];
	begin=new Date().getTime();
	count();
	
	},7200)
	
	}
}

//fungsi pause
function pause()
{
	mark=new Date().getTime();
	clearTimeout(loop);

	if(stat[2]==1)
	{
		if(stat[1]==1)
		{
		stat=[0, 1, 0, 1, 1, 0];
		}

		if(stat[1]==0)
		{
		stat=[0, 0, 0, 1, 1, 0];
		}
	}
}

//fungsi untuk me resume ketika di pause
function resume()
{
	if(stat[3]==1)
	{
		begin=begin+(new Date().getTime()-mark);

		if(stat[1]==1)
		{
		stat=[0, 1, 1, 0, 0, 0];
		countdown();
		}

		if(stat[1]==0)
		{
		stat=[0, 0, 1, 0, 0, 1];
		count();
		}		
	}
}

//fungsi untuk mereset dari awal
function reset1()
{
	if(stat[4]==1)
	{
	document.getElementById('mode').innerHTML="PREPARATION TIME";

	kalkulasi(countu);
	document.getElementById('disp').innerHTML=min+":"+sec;
	document.getElementById('dispMs').innerHTML=ms;

	document.getElementById("finA").innerHTML="00:00";
	document.getElementById("finB").innerHTML="00:00";
	
	a=0;
	b=0;
	tim=0;
	
	clearTimeout(loop);
	stat=[1, 0, 0, 0, 0, 0];
	}
}

//fungsi untuk mengubah langsung hitung maju
function reset2()
{
	document.getElementById('mode').innerHTML="";
	document.getElementById('disp').innerHTML="00:00";
	document.getElementById('dispMs').innerHTML="00";
	
	document.getElementById("finA").innerHTML="00:00";
	document.getElementById("finB").innerHTML="00:00";
	
	a=0;
	b=0;
	tim=0;
	
	clearTimeout(loop);
	stat=[0, 1, 0, 0, 0, 0];
}

//fungsi untuk mencetak waktu										
function fin(team)
{
	if(stat[5]==1)
	{
	tim++;
	document.getElementById("win").play();
	
	switch(team)
	{
		case "A":a=1;break;
		case "B":b=1;break;
	}

	document.getElementById("fin"+team).innerHTML=display;
	}
}