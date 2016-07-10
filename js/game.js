function BonusState() {
  var player;
  var goal;
  var hud;
  var audio;
    this.setup = function () {
    audio = new jaws.Audio({audio: "assets/jinete.mp3", volume: 0.7});
    viewport = viewport = new jaws.Viewport({max_x: 2800, max_y: 2800});
    tile_map = new jaws.TileMap({cell_size: 35, size: [500, 500]});
    player = new jaws.Sprite({image: "assets/toro.png", scale: 0.12, x: viewport.max_x / 2, y: viewport.max_y / 2, anchor: "center"});
    goal = new jaws.Sprite({image: "assets/tipo1.png", scale: 0.08});
    terra = new jaws.SpriteList();
    enemies = new jaws.SpriteList();

    hud = new jaws.Text({text: "Score: 0", x: 380, y: 50, fontSize: 25});
    console.log(hud);
    var x = 0;
    var y = 0;

    audio.play();





    while(x <= 2800){
        while(y <= 2800){
            terra.push(new jaws.Sprite({image: "assets/terrain" + aleatorio(1, 4).toString() + ".png", x: x, y: y}));
            y = y + 35;
                        }
        terra.push(new jaws.Sprite({image: "assets/terrain" + aleatorio(1, 4).toString() + ".png", x: x, y: y}));
        x = x + 35;
        y = 0;
                    }

    var z = 0;
    while(z < 700){
        enemies.push(new jaws.Sprite({image: "assets/tipo" + aleatorio(1, 2).toString() + ".png", x: aleatorio(20, 2730), y: aleatorio(5, 2730), scale: 0.08}));
        z = z + 1;
    }
    console.log(enemies.sprites[0]);

    tile_map.push(terra);
  };
  this.update = function() {

      player.setImage("assets/toro.png");


      if(jaws.pressed("down")) {
          player.move(0, 3);
          player.angle = 90;
      }
      if(jaws.pressed("left")) {
          player.move(-3, 0);
          player.angle = 180;
      }
      if(jaws.pressed("up")) {
          player.move(0, -3);
          player.angle = 270;
      }
      if(jaws.pressed("right")) {
          player.move(3, 0);
          player.angle = 0;
      }
      if(jaws.pressed("up") && jaws.pressed("ctrl")) {
           player.move(0, -6);
      }
      if(jaws.pressed("down") && jaws.pressed("ctrl")) {
          player.move(0, 6);
      }
      if(jaws.pressed("right") && jaws.pressed("ctrl")) {
          player.move(6, 0);
      }
      if(jaws.pressed("left") && jaws.pressed("ctrl")) {
          player.move(-6, 0);
      }
      if(jaws.pressed("up") && jaws.pressed("right")) {
          player.angle = 315;
      }
      if(jaws.pressed("down") && jaws.pressed("left")) {
          player.angle = 135;
      }
      if(jaws.pressed("up") && jaws.pressed("left")) {
          player.angle = 225;
      }
      if(jaws.pressed("down") && jaws.pressed("right")) {
          player.angle = 45;
      }

      var enemies_count = 0;
      while(enemies_count < enemies.length){
          if(jaws.collideOneWithOne(player, enemies.sprites[enemies_count])) {

              enemies.sprites[enemies_count].setImage("assets/sangre.png", 3);
              death_sound = new jaws.Audio({audio: "assets/pedo" + aleatorio(1,4).toString() + ".mp3", volume: 0.5});
              if (enemies.sprites[enemies_count].options.image != "assets/sangre.png"){
                  death_sound.play();

              }
             enemies.sprites[enemies_count].options.image = "assets/sangre.png";

         }
         else{
             if (enemies.sprites[enemies_count].options.image != "assets/sangre.png"){

                 enemies.sprites[enemies_count].move(aleatorio(-1, 1), aleatorio(-1, 1));
             }

                 if(enemies.sprites[enemies_count].x <= 10){
                     enemies.sprites[enemies_count].move(5, 0);
                 }
                 if(enemies.sprites[enemies_count].y <= 10){
                     enemies.sprites[enemies_count].move(0, 5);
                 }
                 if(enemies.sprites[enemies_count].x >= 2760){
                     enemies.sprites[enemies_count].move(-5, 0);
                 }
                 if(enemies.sprites[enemies_count].y >= 2760){
                     enemies.sprites[enemies_count].move(0, -5);
                 }

      }
      enemies_count = enemies_count + 1;
     }
     enemies_count = 0;
     defeated = 0;

     while(enemies_count < enemies.length){
         if (enemies.sprites[enemies_count].options.image == "assets/sangre.png"){
             defeated = defeated + 1;
             enemies_count = enemies_count + 1;
         }
         else{
             defeated = defeated;
             enemies_count = enemies_count + 1;
         }


     }

     hud = new jaws.Text({text: "Score: " + defeated.toString(), x: 380, y: 50, fontSize: 25});

     console.log(defeated);

     if(player.x <= 40){
         player.move(9, 0);
     }
     if(player.y <= 40){
         player.move(0, 9);
     }
     if(player.x >= 2760){
         player.move(-9, 0);
     }
     if(player.y >= 2760){
         player.move(0, -9);
     }




     viewport.centerAround(player);

     if(defeated >= 666){
         jaws.switchGameState(EndState);
     }

  };
  this.draw = function() {
      jaws.clear();
      viewport.draw(terra);



      viewport.apply(function(){
          var num_of_enemies = 0;
          while(num_of_enemies < enemies.length){
              enemies.sprites[num_of_enemies].draw();
              num_of_enemies = num_of_enemies + 1;
          }
          player.draw();

      });
      hud.draw();
  };
}

function PlayState() {
  var player;
  var goal;
  var hud;
  var audio;
  var death_sound;
    this.setup = function () {
    audio = new jaws.Audio({audio: "assets/cotidie.mp3", volume: 0.7});

    viewport = viewport = new jaws.Viewport({max_x: 2100, max_y: 2100});
    tile_map = new jaws.TileMap({cell_size: 35, size: [500, 500]});
    player = new jaws.Sprite({image: "assets/toro.png", scale: 0.12, x: viewport.max_x / 2, y: viewport.max_y / 2, anchor: "center"});
    goal = new jaws.Sprite({image: "assets/tipo1.png", scale: 0.08});
    terra = new jaws.SpriteList();
    enemies = new jaws.SpriteList();

    hud = new jaws.Text({text: "Score: 0", x: 380, y: 50, fontSize: 25});
    console.log(hud);
    var x = 0;
    var y = 0;

    audio.play();





    while(x <= 2100){
        while(y <= 2100){
            terra.push(new jaws.Sprite({image: "assets/terrain" + aleatorio(1, 4).toString() + ".png", x: x, y: y}));
            y = y + 35;
                        }
        terra.push(new jaws.Sprite({image: "assets/terrain" + aleatorio(1, 4).toString() + ".png", x: x, y: y}));
        x = x + 35;
        y = 0;
                    }

    var z = 0;
    while(z < 275){
        enemies.push(new jaws.Sprite({image: "assets/tipo" + aleatorio(1, 2).toString() + ".png", x: aleatorio(20, 2030), y: aleatorio(5, 2030), scale: 0.08}));
        z = z + 1;
    }
    console.log(enemies.sprites[0]);

    tile_map.push(terra);
  };
  this.update = function() {

      player.setImage("assets/toro.png");


      if(jaws.pressed("down")) {
          player.move(0, 3);
          player.angle = 90;
      }
      if(jaws.pressed("left")) {
          player.move(-3, 0);
          player.angle = 180;
      }
      if(jaws.pressed("up")) {
          player.move(0, -3);
          player.angle = 270;
      }
      if(jaws.pressed("right")) {
          player.move(3, 0);
          player.angle = 0;
      }
      if(jaws.pressed("up") && jaws.pressed("right")) {
          player.angle = 315;
      }
      if(jaws.pressed("down") && jaws.pressed("left")) {
          player.angle = 135;
      }
      if(jaws.pressed("up") && jaws.pressed("left")) {
          player.angle = 225;
      }
      if(jaws.pressed("down") && jaws.pressed("right")) {
          player.angle = 45;
      }

      var enemies_count = 0;
      while(enemies_count < enemies.length){
          if(jaws.collideOneWithOne(player, enemies.sprites[enemies_count])) {
             enemies.sprites[enemies_count].setImage("assets/sangre.png", 3);
             death_sound = new jaws.Audio({audio: "assets/pedo" + aleatorio(1,4).toString() + ".mp3", volume: 0.5});
             if (enemies.sprites[enemies_count].options.image != "assets/sangre.png"){
                 death_sound.play();

             }
             enemies.sprites[enemies_count].options.image = "assets/sangre.png";



         }
         else{
             if (enemies.sprites[enemies_count].options.image != "assets/sangre.png"){

                 enemies.sprites[enemies_count].move(aleatorio(-1, 1), aleatorio(-1, 1));
             }

                 if(enemies.sprites[enemies_count].x <= 10){
                     enemies.sprites[enemies_count].move(5, 0);
                 }
                 if(enemies.sprites[enemies_count].y <= 10){
                     enemies.sprites[enemies_count].move(0, 5);
                 }
                 if(enemies.sprites[enemies_count].x >= 2060){
                     enemies.sprites[enemies_count].move(-5, 0);
                 }
                 if(enemies.sprites[enemies_count].y >= 2060){
                     enemies.sprites[enemies_count].move(0, -5);
                 }

      }
      enemies_count = enemies_count + 1;
     }
     enemies_count = 0;
     defeated = 0;

     while(enemies_count < enemies.length){
         if (enemies.sprites[enemies_count].options.image == "assets/sangre.png"){
             defeated = defeated + 1;
             enemies_count = enemies_count + 1;
         }
         else{
             defeated = defeated;
             enemies_count = enemies_count + 1;
         }


     }

     hud = new jaws.Text({text: "Score: " + defeated.toString(), x: 380, y: 50, fontSize: 25});

     console.log(defeated);

     if(player.x <= 40){
         player.move(5, 0);
     }
     if(player.y <= 40){
         player.move(0, 5);
     }
     if(player.x >= 2060){
         player.move(-5, 0);
     }
     if(player.y >= 2060){
         player.move(0, -5);
     }




     viewport.centerAround(player);

     if(defeated >= 227){
         audio.stop();
         jaws.switchGameState(BrigdeState);
     }

  };
  this.draw = function() {
      jaws.clear();
      viewport.draw(terra);



      viewport.apply(function(){
          var num_of_enemies = 0;
          while(num_of_enemies < enemies.length){
              enemies.sprites[num_of_enemies].draw();
              num_of_enemies = num_of_enemies + 1;
          }
          player.draw();

      });
      hud.draw();
  };
}

function BrigdeState() {
    this.setup = function(){
        msg_lament = new jaws.Text({text: "Lamentablemente", x: 170, y: 120, fontSize: 25});
        msg = new jaws.Text({text: "algún paleto te ha pegado un tiro.", x: 130, y: 150, fontSize: 20});
        msg1 = new jaws.Text({text: "Estás muerto pero al menos sacaste", x: 120, y: 180, fontSize: 20});
        msg4 = new jaws.Text({text: "la basura antes de marcharte.", x: 145, y: 210, fontSize: 20});
        msg2 = new jaws.Text({text: "Enhorabuena!", x: 170, y: 280, fontSize: 33});
        msg3 = new jaws.Text({text: "Pulsa espacio para seguir jugando!", x: 120, y: 320, fontSize: 20});}
    this.update = function(){
        if(jaws.pressed("space")) {
            jaws.switchGameState(BonusState);
        }
    };
    this.draw = function(){jaws.clear();msg_lament.draw();msg.draw();msg1.draw();msg2.draw();msg3.draw();msg4.draw()};
}

function EndState() {
    this.setup = function(){
        msg_lament = new jaws.Text({text: "Mataste a 666. Hell yeah!", x: 170, y: 100, fontSize: 20});
        msg = new jaws.Text({text: "Belcebú te quiere en su capea.", x: 160, y: 150, fontSize: 20});
        msg1 = new jaws.Text({text: "Musica de Stillnes.", x: 250, y: 260, fontSize: 25});
        msg2 = new jaws.Text({text: "Creado por jgalanc.", x: 248, y: 300, fontSize: 25});
        setTimeout(function(){ jaws.switchGameState(StaticLogoState) }, 6000);}
    this.update = function(){};
    this.draw = function(){jaws.clear();msg_lament.draw();msg.draw();msg1.draw();msg2.draw();};
}

function FirstState() {
    this.setup = function(){
        msg_lament = new jaws.Text({text: "La historia es la de siempre.", x: 130, y: 100, fontSize: 20});
        msg = new jaws.Text({text: "Estas en tordesillas. Mal lugar para ser toro.", x: 70, y: 130, fontSize: 20});
        msg1 = new jaws.Text({text: "Estas rodeado de gente.", x: 150, y: 160, fontSize: 20});
        msg2 = new jaws.Text({text: "Mátalos a todos antes de que algún desaprensivo te dispare.", x: 20, y: 190, fontSize: 20});
        msg3 = new jaws.Text({text: "Eres grande! Eres libre!", x: 150, y: 220, fontSize: 20});
        msg4 = new jaws.Text({text: "Muévete con las flechas.", x: 150, y: 295, fontSize: 20});
        msg5 = new jaws.Text({text: "Libera la bestia pulsando espacio.", x: 115, y: 325, fontSize: 20});};
    this.update = function(){

        if(jaws.pressed("space")) {
            jaws.switchGameState(PlayState);
        }
    };
    this.draw = function(){jaws.clear();msg_lament.draw();msg.draw();msg1.draw();msg2.draw();msg3.draw();msg4.draw();msg5.draw()};
}

function PresentationState() {
    this.setup = function(){

        logo = new jaws.Sprite({image:"assets/plgs.png", anchor: "center", scale: 0.3, x: 250, y: 250});};
        setTimeout(function(){ jaws.switchGameState(FirstState) }, 6000);

    this.update = function(){

        if(jaws.pressed("space")) {
            jaws.switchGameState(PlayState);
        }
    };
    this.draw = function(){jaws.clear();logo.draw();};
}

function StaticLogoState() {
    this.setup = function(){

        logo = new jaws.Sprite({image:"assets/plgs.png", anchor: "center", scale: 0.3, x: 250, y: 250});};

    this.update = function(){

        if(jaws.pressed("space")) {
            jaws.switchGameState(PlayState);
        }
    };
    this.draw = function(){jaws.clear();logo.draw();};
}

jaws.onload = function() {
    jaws.assets.add("assets/toro.png");
    jaws.assets.add("assets/tipo1.png");
    jaws.assets.add("assets/tipo2.png");
    jaws.assets.add("assets/sangre.png");
    jaws.assets.add("assets/terrain1.png");
    jaws.assets.add("assets/terrain2.png");
    jaws.assets.add("assets/terrain3.png");
    jaws.assets.add("assets/terrain4.png");
    jaws.assets.add("assets/plgs.png");
    jaws.assets.add("assets/cotidie.mp3");
    jaws.assets.add("assets/jinete.mp3");
    jaws.assets.add("assets/pedo1.mp3");
    jaws.assets.add("assets/pedo2.mp3");
    jaws.assets.add("assets/pedo3.mp3");
    jaws.assets.add("assets/pedo4.mp3");
    jaws.start(PresentationState);
};

function aleatorio(inferior,superior){
       var resAleatorio = Math.floor((Math.random() * (superior - inferior + 1)) + inferior);
      return resAleatorio;
  }
