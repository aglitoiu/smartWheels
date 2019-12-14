FILE=coords.txt

echo "################################"

while read p; do
        coordsarr=($p)

	echo "INSERT INTO Route_6 (lat,longit) values (${coordsarr[0]},${coordsarr[1]});" | mysql -u root -pmacos  smartWheels;

done < $FILE
