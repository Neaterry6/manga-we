const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/cover/:mangaId/:fileName', async (req, res) => {
  try {
    const { mangaId, fileName } = req.params;
    const url = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    const response = await fetch(url, { headers: { 'User-Agent': 'StreamMe-Manga-App/1.0' } });
    if (!response.ok) throw new Error(`Failed to fetch cover: ${response.status}`);
    res.set('Content-Type', 'image/jpeg');
    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching cover');
  }
});

app.get('/chapter/:hash/:img', async (req, res) => {
  try {
    const { hash, img } = req.params;
    const url = `https://uploads.mangadex.org/data/${hash}/${img}`;
    const response = await fetch(url, { headers: { 'User-Agent': 'StreamMe-Manga-App/1.0' } });
    if (!response.ok) throw new Error(`Failed to fetch chapter image: ${response.status}`);
    res.set('Content-Type', 'image/jpeg');
    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching chapter image');
  }
});

module.exports = app
