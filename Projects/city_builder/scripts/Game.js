SetUpdate(Update);
setInterval(AddMoney, 1000);

LoadTexture("texture_grass", "textures/Grass.png");
LoadTexture("texture_water", "textures/Water.png");
LoadTexture("texture_dirt",  "textures/Dirt.jpg");

LoadTexture("texture_road", "textures/Road.png");
LoadTexture("texture_road_cap_1", "textures/Road_cap_1.png");
LoadTexture("texture_road_cap_2", "textures/Road_cap_2.png");
LoadTexture("texture_road_cap_3", "textures/Road_cap_3.png");
LoadTexture("texture_road_cap_4", "textures/Road_cap_4.png");

LoadTexture("texture_road_straight_1", "textures/Road_straight_1.png");
LoadTexture("texture_road_straight_2", "textures/Road_straight_2.png");

LoadTexture("texture_road_three_1", "textures/Road_three_1.png");
LoadTexture("texture_road_three_2", "textures/Road_three_2.png");
LoadTexture("texture_road_three_3", "textures/Road_three_3.png");
LoadTexture("texture_road_three_4", "textures/Road_three_4.png");

LoadTexture("texture_road_turn_1", "textures/Road_turn_1.png");
LoadTexture("texture_road_turn_2", "textures/Road_turn_2.png");
LoadTexture("texture_road_turn_3", "textures/Road_turn_3.png");
LoadTexture("texture_road_turn_4", "textures/Road_turn_4.png");

LoadTexture("texture_road_center", "textures/Road_center.png");

LoadTexture("texture_1_house", "textures/House_1.png");
LoadTexture("texture_2_house", "textures/House_2.png");
LoadTexture("texture_3_house", "textures/House_3.png");
LoadTexture("texture_4_house", "textures/House_4.png");

AddColor("texture_grass");
AddColor("texture_water");
AddColor("texture_dirt");
AddColor("texture_road");
AddColor("texture_road_cap_1");
AddColor("texture_road_cap_2");
AddColor("texture_road_cap_3");
AddColor("texture_road_cap_4");
AddColor("texture_road_straight_1");
AddColor("texture_road_straight_2");

AddColor("texture_road_three_1");
AddColor("texture_road_three_2");
AddColor("texture_road_three_3");
AddColor("texture_road_three_4");

AddColor("texture_road_turn_1");
AddColor("texture_road_turn_2");
AddColor("texture_road_turn_3");
AddColor("texture_road_turn_4");

AddColor("texture_road_center");

AddColor("texture_1_house");
AddColor("texture_2_house");
AddColor("texture_3_house");
AddColor("texture_4_house");

var ThingToPlace = document.getElementById('object');
var Place = document.getElementById('place');
var Population = document.getElementById('population');
var Money = document.getElementById('money');

function IsRoad(tile) {
  if (tile == 3 || tile == 4 || tile == 5 || tile == 6 || tile == 7 || tile == 8 || tile == 9 || tile == 10 || tile == 11 || tile == 12 || tile == 13 || tile == 14 || tile == 15 || tile == 16 || tile == 17 || tile == 18)
    return true;
  else
    return false;
}
function IsHouse(tile) {
  if (tile == 19 || tile == 20 || tile == 21 || tile == 22)
    return true;
  else
    return false;
}

function PlaceHouse(x, y) {
  var setHouse = false;
  if (IsHouse(GetTile(x, y))) {
    return false;
  }
  if (IsRoad(GetTile(x + 1, y))) {
    setHouse = true;
    SetTile(x, y, 19);
  }

  if (IsRoad(GetTile(x - 1, y))) {
    setHouse = true;
    SetTile(x, y, 20);
  }

  if (IsRoad(GetTile(x, y + 1))) {
    setHouse = true;
    SetTile(x, y, 21);
  }

  if (IsRoad(GetTile(x, y - 1))) {
    setHouse = true;
    SetTile(x, y, 22);
  }

  return setHouse;
}

function TouchingRoad(x, y) {
  if (IsRoad(GetTile(x + 1, y))) {
    return true;
  }

  if (IsRoad(GetTile(x - 1, y))) {
    return true;
  }

  if (IsRoad(GetTile(x, y + 1))) {
    return true;
  }

  if (IsRoad(GetTile(x, y - 1))) {
    return true;
  }

  return false;
}

var Speed = 0.1;
var Population_Amt = 0;
var Money_Amt = 10000;

function AddMoney() {
  Money_Amt += (Population_Amt * 5);
}

function Update() {
  SetUpdateGrid("Terrain");

  if (MouseButtonDown(0) && GetTile(HoveredTile[0], HoveredTile[1]) == 0) {
    SetUpdateGrid("City");
    if (Place.checked == false) {
      if (ThingToPlace.value == "road" &&
          TouchingRoad(HoveredTile[0], HoveredTile[1]) &&
          !IsRoad(GetTile(HoveredTile[0], HoveredTile[1]))) {

        if (Money_Amt >= 1000) {
          SetTile(HoveredTile[0], HoveredTile[1], 3);
          Money_Amt -= 1000;
        }
      }
      else if (ThingToPlace.value == "house" && Money_Amt >= 2000) {
        if (PlaceHouse(HoveredTile[0], HoveredTile[1]))
          Money_Amt -= 2000;
      }
    } else
      SetTile(HoveredTile[0], HoveredTile[1], 0);
  }
  SetUpdateGrid("City");

  Population_Amt = 0;

  SetTile(Math.trunc(Size_x / 2), 0, 3);
  SetTile(Math.trunc(Size_x / 2), 1, 3);
  SetTile(Math.trunc(Size_x / 2), 2, 3);
  SetTile(Math.trunc(Size_x / 2), 3, 3);
  SetTile(Math.trunc(Size_x / 2), 4, 3);

  if (KeyDown("ArrowUp"))
    Zoom(1);
  else if (KeyDown("ArrowDown"))
    Zoom(-1);

  if (KeyDown("W"))
    MoveCamera(0, Speed);
  if (KeyDown("A"))
    MoveCamera(Speed, 0);
  if (KeyDown("S"))
    MoveCamera(0, -Speed);
  if (KeyDown("D"))
    MoveCamera(-Speed, 0);


  for (var x = 0; x < Size_x; x++) {
    for (var y = 0; y < Size_y; y++) {
      if (IsRoad(GetTile(x, y))) {
        SetTile(x, y, 3);
        var left = GetTile(x - 1, y);
        var right = GetTile(x + 1, y);
        var bottom = GetTile(x, y + 1);
        var top = GetTile(x, y - 1);

        var left_road = false;
        if (IsRoad(left)) {
          left_road = true;
          SetTile(x, y, 5);
        }

        var right_road = false;
        if (IsRoad(right)) {
          right_road = true;
          SetTile(x, y, 4);
        }

        var bottom_road = false;
        if (IsRoad(bottom)) {
          bottom_road = true;
          SetTile(x, y, 6);
        }

        var top_road = false;
        if (IsRoad(top)) {
          top_road = true;
          SetTile(x, y, 7);
        }

        if (left_road && right_road) {
          SetTile(x, y, 8);
        }

        if (top_road && bottom_road) {
          SetTile(x, y, 9);
        }

        if (right_road && bottom_road) {
          SetTile(x, y, 14);
        }

        if (right_road && top_road) {
          SetTile(x, y, 15);
        }

        if (left_road && top_road) {
          SetTile(x, y, 16);
        }

        if (left_road && bottom_road) {
          SetTile(x, y, 17);
        }

        if (top_road && right_road && bottom_road) {
          SetTile(x, y, 10);
        }

        if (top_road && right_road && left_road) {
          SetTile(x, y, 11);
        }

        if (top_road && bottom_road && left_road) {
          SetTile(x, y, 12);
        }

        if (right_road && bottom_road && left_road) {
          SetTile(x, y, 13);
        }

        if (left_road && right_road && top_road && bottom_road) {
          SetTile(x, y, 18);
        }
      }
      if (IsHouse(GetTile(x, y))) {
        var canPlace = false;
        if (IsRoad(GetTile(x + 1, y))) {
          canPlace = true;
          SetTile(x, y, 19);
        }

        if (IsRoad(GetTile(x - 1, y))) {
          canPlace = true;
          SetTile(x, y, 20);
        }

        if (IsRoad(GetTile(x, y + 1))) {
          canPlace = true;
          SetTile(x, y, 21);
        }

        if (IsRoad(GetTile(x, y - 1))) {
          canPlace = true;
          SetTile(x, y, 22);
        }

        if (!canPlace) {
          SetTile(x, y, 0);
        } else {
          Population_Amt += 4;
        }
      }
    }
  }
  Population.innerHTML = Population_Amt;
  Money.innerHTML = Money_Amt;
}
