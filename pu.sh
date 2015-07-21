clear

cp config.xml www
cp -r resources www

git add .
git commit -a -m "$*"
git clean -f
git push origin master

curl -u mark@learnsomestuff.com -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/1558732

ionic upload

rm www/config.xml
rm -r www/resources