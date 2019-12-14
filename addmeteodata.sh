FILE=meteoTemp.txt

echo "################################"

while read p; do

        set $p
        date="${1} ${2}"
        echo $date
        echo $3
        echo "INSERT INTO Meteo (date,temp) values ($date,$3);" | mysql -u root -pmacos  smartWheels;




done < $FILE
