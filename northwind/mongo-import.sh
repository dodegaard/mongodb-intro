for f in *.csv
do
    filename=$(basename "$f")
    extension="${filename##*.}"
    filename="${filename%.*}"
    mongoimport --host=127.0.0.1 --port=27017 --db=northwind --collection "$filename" --type csv --file "$f" --headerline
done