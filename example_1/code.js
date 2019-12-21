"use strict";

// задаём размеры игрового поля
let ww = 800;
let hh = 600;

// функция для создания куба
function createCube(scene, width, height, length, color) {
    let cubeGeometry = new THREE.CubeGeometry(width, height, length);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: color});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
    return cube;
}

// функция для создания источника света
function createLight(scene, color, force) {
    let pointLight = new THREE.PointLight(color, force);
    scene.add(pointLight);
    return pointLight;
}

window.onload = function() {
    // создаём сцену
    let scene = new THREE.Scene();
    // создаём камеру
    let camera = new THREE.PerspectiveCamera(45, ww / hh, 0.1, 1000);
    // создаём визуализатор
    let renderer = new THREE.WebGLRenderer();
    // задаём цвет фона сцены
    renderer.setClearColor("#0000FF");
    // задаём размер окна с 3D графикой
    renderer.setSize(ww,hh);
    // связать рендер с боксом
    document.getElementById("gameBox").append(renderer.domElement);

    // создание сетки
    // размер стороны ВСЕЙ сетки
    let sizeOfSetka = 70;
    // на сколько частей разбита каждая сторона сетки
    let divisions = 8;
    // цвет опорных осей сетки
    let color_1 = "#00FF00";
    // цвет клеток сетки
    let color_2 = "#FFFFFF";
    // создаём сетку
    let gridHelper = new THREE.GridHelper(sizeOfSetka, divisions, color_1, color_2);
    // добавляем сетку на сцену
    scene.add(gridHelper);

    // задаём позицию камеры для вида сверху на сетку
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 0;

    // заставляем смотреть камеру на заданную позицию
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // создаем первый куб
    let k1 = createCube(scene, 10, 6, 20, "#FF0000");
    // задаем позицию куба
    k1.position.x = 9;
    k1.position.y = 3;
    k1.position.z = -15;

    // создаем второй куб
    let k2 = createCube(scene, 10, 6, 20, "#00FF00");
    // задаем позицию куба
    k2.position.x = -9;
    k2.position.y = 3;
    k2.position.z = -15;

    // создаем третий куб (земля)
    let k3 = createCube(scene, 70, 1, 70, "#556B2F");
    // задаем позицию куба (земли)
    k3.position.x = 0;
    k3.position.y = -0.5 - 0.1;
    k3.position.z = 0;

    // создаем источник света
    let q1 = createLight(scene, "#FFFFFF", 2);
    // задаем позицию источника света
    q1.position.x = 0;
    q1.position.y = 100;
    q1.position.z = 0;
    
    // выводим на экран то, что видит камера
    renderer.render(scene, camera);

    // доступ к кнопкам
    let frontBtn = document.getElementById("frontBtn");
    let backBtn = document.getElementById("backBtn");

    // при нажатии на кнопку двигаем камеру Вперед
    frontBtn.onclick = function() {
        camera.position.z -= 5;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
    }

    // при нажатии на кнопку двигаем камеру Назад
    backBtn.onclick = function() {
        camera.position.z += 5;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        renderer.render(scene, camera);
    }
}