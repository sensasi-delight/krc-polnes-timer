let stat=[1, 0, 0, 0, 0, 0];
/* 	array 0 = countdown
	array 1 = countup
	array 2 = pause
	array 3 = resume
	array 4 = reset
	array 5 = cetak
*/

let min;
let sec;
let ms;

let a=0;
let b=0;
let tim=0;

let begin;
let mark;
let display;		
let loop;
let win;
let txtWin;

let countd=5*1000; //waktu hitung mundur di set disini dalam milisecond 
let countu=15*60*1000; //waktu hitung maju di set disini dalam milisecond, contoh : saya ingin mengeset 5 detik jadi   (detik yg diinginkan)*(1 detik dalam milisecond) = 5*1000 = 5000 miliseconds

let muted = false;

//LIST TEAM
let arrTeam = [];

window.addEventListener("keyup", check, false);

function check(e)
{
	// Debug untuk memastikan keyCode yang ditekan pada keyboard.
	// console.log(e.keyCode);
	switch(e.keyCode)
	{
		//Keymap, untuk mengeset key masukan kode ascii nya. info kode ascii lihat disini http://www.theasciicode.com.ar/
		// case 112:if(a==0){fin("A")};break; 	//112 = F1
		// case 119:if(b==0){fin("B")};break; 	//119 = F8
		case 65:
			if(a==0){fin("A")};
			break; 								//65 = a => untuk TIM A
		case 66:
			if(b==0){fin("B")};
			break; 								//66 = b => untuk TIM B
		case 32:
			if(stat[0]==1){initCountDown()} 	//32 = Spasi
			else{initCountUp()};
			break;     	
		case 49:
			reset1();
			break;		   						//49 = 1
		case 50:
			reset2();
			break;		   						//50 = 2
		case 81:
			pause();
			break;								//81 = Q
		case 87:
			resume();
			break;								//82 = W
		case 77:
			mute(muted = !muted);
			break;								//77 = M
	}
}

//konversi dari ms -> min, sec, ms
const kalkulasi = (conv) => 
{
	min=Math.floor(conv/60000);
	sec=Math.floor((conv-min*60000)/1000);
	ms=Math.floor((conv-sec*1000-min*60000)/10);
	
	min = checkTime(min);
	sec = checkTime(sec);
	ms = checkTime(ms);
}

//fungsi untuk hitung mundur. fungsi ini akan berhenti sampai waktu = 0
const countdown = () => 
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
const count = () => 
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
const checkTime = (i) => 
{
	if(i<10)
	{
		i="0"+i
	};
	return i;
}

//inisialisasi untuk hitung mundur
const initCountDown = () => 
{
	if(stat[0]==1)
	{
		begin=new Date().getTime()+(countd);
		stat=[0, 1, 1, 0, 1, 0];
		countdown();
	}
}

//inisialisasi untuk hitung maju
const initCountUp = () => 
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
const pause = () => 
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
const resume = () => 
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
const reset1 = () => 
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
const reset2 = () => 
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
const fin = (team) =>
{
	if(stat[5]==1)
	{
		tim++;
		document.getElementById("win").play();
		
		switch(team)
		{
			case "A":
				a=1;
				win= (win === 1) ? 2 : 1;
				break;
			case "B":
				b=1;
				win= (win === 1) ? 2 : 1;
				break;
		}

		document.getElementById("fin"+team).innerHTML=display;
		txtWin = (win == 1) ? 'WINNER' : 'LOSE';
		((win == 1) ? document.getElementById("winTeam"+team).setAttribute('class', 'winner') : document.getElementById("winTeam"+team).setAttribute('class', 'lose'));
		document.getElementById("winTeam"+team).innerHTML=txtWin;
	}
}

//fungsi untuk muted suara audio
const mute = (enabled) => {
	document.getElementById('prepare').muted = enabled;
	document.getElementById('win').muted = enabled;
	document.getElementById('start').muted = enabled;
	document.getElementById('limit').muted = enabled;
}