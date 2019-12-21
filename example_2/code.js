"use strict";

// задаём размеры игрового поля
let ww = 800;
let hh = 600;

// глобальная переменная - состояние анимации
let animation = false;

// функция для создания конуса
function createCone(scene, radius, height, sideNumber, color) {
    let cone_geometry = new THREE.ConeBufferGeometry(radius, height, sideNumber);
    let cone_material = new THREE.MeshLambertMaterial({color: color});
    let cone = new THREE.Mesh(cone_geometry,cone_material);
    scene.add(cone);
    return cone;
} 

// функция для создания сферы
function createSphere(scene, radius, color, segments) {
    let sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    let sphereMaterial = new THREE.MeshLambertMaterial({color: color});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    return sphere;
}

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

    // задаём позицию камеры
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 30;

    // заставляем смотреть камеру на заданную позицию
    camera.lookAt(new THREE.Vector3(0, 5, 0));

    // создаем источник света
    let q1 = createLight(scene, "#FFFFFF", 2);
    // задаем позицию источника света
    q1.position.x = 0;
    q1.position.y = 100;
    q1.position.z = 0;

    // создаем куб (земля)
    let ground = createCube(scene, 70, 1, 70, "#556B2F");
    // задаем позицию куба (земли)
    ground.position.x = 0;
    ground.position.y = -0.5 - 0.1;
    ground.position.z = 0;

    // создаем сферу
    let elementA = createSphere(scene, 2, "#A0522D", 16);
    elementA.position.x = 3;
    elementA.position.y = 2;
    elementA.position.z = 0;

    // создаем куб
    let elementB = createCube(scene, 4, 4, 4, "#D2691E");
    elementB.position.x = -3;
    elementB.position.y = 2;
    elementB.position.z = 0;

    // создаем конус
    let elementC = createCone(scene, 2, 4, 6, "#696969");
    elementC.position.x = -9;
    elementC.position.y = 2;
    elementC.position.z = 0;

    // создаем еще один источник света
    let lightForHero = createLight(scene, "#FFFFFF", 1.5);
    // делаем позицию как у камеры
    lightForHero.position.x = camera.position.x;
    lightForHero.position.y = camera.position.y;
    lightForHero.position.z = camera.position.z;
    
    // выводим на экран то, что видит камера
    renderer.render(scene, camera);

    // доступ к кнопке
    let startAnimationButton = document.getElementById("startAnimationButton");

    // при нажатии на кнопку запускаем анимацию (изменяем глобальную переменную)
    startAnimationButton.onclick = function() {
        startAnimationButton.disabled = true;
        animation = true;
        console.log("Start animation");
    }

    // выполнение кода циклически через интервалы времени
    setInterval(function() {
        if(animation === true) {
            // двигаем камеру
            camera.position.x += 0.3;
            // делаем позицию у источника света как у камеры
            lightForHero.position.x = camera.position.x;
            lightForHero.position.y = camera.position.y;
            lightForHero.position.z = camera.position.z;
            // заставляем смотреть камеру на заданную позицию
            camera.lookAt(new THREE.Vector3(0, 5, 0));
            // выводим на экран то, что видит камера
            renderer.render(scene, camera);
        }
    }, 75);
}