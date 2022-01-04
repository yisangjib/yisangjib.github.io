var infospot1, infospot2, infospot3, infospot4, viewer;
const panorama = new PANOLENS.ImagePanorama("./images/8.jpg");

////////////////////////////////////////////////

infospot1 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
infospot1.position.set(-1000.0, -750, -4000);
infospot1.addHoverElement(
  document.getElementById("desc-container-1"),
  200
);

infospot2 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
infospot2.position.set(2500.0, -200, -3996.49);
infospot2.addHoverElement(
  document.getElementById("desc-container-2"),
  200
);

infospot3 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
infospot3.position.set(2800.0, -500.25, 0.56);
infospot3.addHoverElement(
  document.getElementById("desc-container-3"),
  200
);

infospot4 = new PANOLENS.Infospot(500, PANOLENS.DataImage.Info);
infospot4.position.set(500.0, -750.25, 197.56);
infospot4.addHoverElement(
  document.getElementById("desc-container-4"),
  200
);

////////////////////////////////////////////

panorama.add(infospot1);
panorama.add(infospot2);
panorama.add(infospot3);
panorama.add(infospot4);

viewer = new PANOLENS.Viewer();
viewer.add(panorama);