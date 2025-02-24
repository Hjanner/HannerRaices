/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    const lat = document.querySelector('#lat').value || 8.29755990497009;\r\n    const lng = document.querySelector('#lng').value || -62.71151127857323;\r\n    const map = L.map('map').setView([lat, lng ], 16);\r\n    \r\n    //utilizar provider y geocode\r\n    const geocodeService = L.esri.Geocoding.geocodeService();                       //obtener servicios para obtener los nombres\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(map);\r\n\r\n    //pin\r\n    var marker = new L.marker([lat, lng], {\r\n        draggable: true,            //permite mover el pin\r\n        autoPan: true               //tralada el mapa en relacion al pin \r\n    }).addTo(map)    \r\n\r\n    //detectar movimiento del pin\r\n    marker.on('moveend', function(e){        \r\n        marker  = e.target;                                         //instancio      \r\n        console.log(marker);\r\n        \r\n        \r\n        const position = marker.getLatLng();                        //obtener pos\r\n        map.panTo(new L.LatLng(position.lat, position.lng));        //sensacion de posicionar la marca en el centro del mapa\r\n\r\n        //obtener informacion de las calles al soltar el pin\r\n        geocodeService.reverse().latlng(position, 16).run(function(error, resultado){\r\n            if (error) console.log( error);\r\n            else  console.log(resultado);\r\n\r\n            //mostrar globo de inf en el marker\r\n            marker.bindPopup(resultado.address.LongLabel);\r\n\r\n            //llenar los campo\r\n            document.querySelector('.calle').textContent = resultado?.address?.LongLabel  ?? '';\r\n            document.querySelector('#calle').value = resultado?.address.LongLabel  ?? '';\r\n            document.querySelector('#lat').value = resultado?.latlng.lat ?? '';\r\n            document.querySelector('#lng').value = resultado?.latlng.lng ?? '';\r\n\r\n        })\r\n\r\n    })\r\n\r\n\r\n    \r\n\r\n})(map)\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;