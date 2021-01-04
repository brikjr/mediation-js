const app = () =>{
    //////////////seting variables
    const audio = document.querySelector('.audio');
    const play  = document.querySelector('.play');
    const outline  = document.querySelector('.moving-outline circle');
    const video  = document.querySelector('.video-container video');
    const mode = document.querySelectorAll('.mode button'); //swirching modes
    const timeSelect = document.querySelectorAll('.timer button') ;
    const timeCounter = document.querySelector('.time-counter'); //h3
    //get circle width
    const outlineLength = outline.getTotalLength();
    //Duration
    let playingTime = 120;
    //animating player
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //playing sounds
    play.addEventListener('click' , (e) =>{
        checking(audio) ; //pass our audio file to function we created
    })

    //time select 2min , 5 min , 10 min
    timeSelect.forEach( eve => {
        eve.addEventListener('click' , function (){
            playingTime = this.getAttribute('data-time');
            timeCounter.textContent = `${Math.floor(playingTime / 60)}:${Math.floor(playingTime % 60)}`;
            
            let progress = outlineLength - (currentTime / playingTime) * outlineLength ;
            outline.style.strokeDashoffset = progress ;
        });
    }) ;

    //switch modes
    mode.forEach( eve => {
        eve.addEventListener('click' , function () {
            audio.src = this.getAttribute('data-sound') ;
            video.src = this.getAttribute('data-video') ;
            play.src = "./assets/svg/play.svg" ;
        });
    } );

    //checking if it play or not
    const checking = song => {
      if(song.paused) {
          audio.play();
          video.play();
          play.src = "./assets/svg/pause.svg" ;
      } else{
        audio.pause();
        video.pause();
        play.src = "./assets/svg/play.svg" ;
    } 
    }
    //counter time
    audio.ontimeupdate = () =>{
        let currentTime = audio.currentTime;
        let elapsedTime = playingTime - currentTime ;
        let seconds = Math.floor( elapsedTime % 60 );
        let mintues = Math.floor( elapsedTime / 60 );

        //animate bar
        let progress = outlineLength - (currentTime / playingTime) * outlineLength ;
        outline.style.strokeDashoffset = progress ;
        //count time
        timeCounter.textContent = `${mintues}:${seconds}`;
        //if time end
    if ( currentTime >= playingTime ){
        audio.pause();
        video.pause();
        audio.currentTime = 0 ;
        play.src = "./assets/svg/play.svg" ;

    }
    }

    
}

app();