# Ökologie Zertifikat Tester

Trainingswebsite für das österreichische Tierökologie Zertifikat.

## Local Development

Starten des lokalen Servers mit, z.B.:

```bash
npx http-server
```

### Image Optimierung

Die Bilder sind von der Paris Lodron Universität Salzburg: <https://www.plus.ac.at/umwelt-und-biodiversitaet/institutionen/artenkenntnis-zertifikat-zoologie/>

```bash
# brew install imagemagick
# sudo apt-get install imagemagick
bash scripts/downsize.sh ./files/images_raw ./files/images 600
```
