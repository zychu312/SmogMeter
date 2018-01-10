exports.builder = records => ({
    getRecords: async (from, to) => {

        const measurements = await records.find({ date: { $gte: from, $lte: to } }).toArray();

        let means = [];
        let accumulator = { timestamp: 0, pm10: 0, pm25: 0 };

        let meansSize = 1000;
        let shorteningRatio = Math.floor(measurements.length / 1000);

        let i = 0;

        if (measurements.length <= meansSize) return new Promise(resolve => resolve(measurements));

        measurements.forEach(x => {

            if (i < shorteningRatio) {
                accumulator.timestamp += x.date.getTime();
                accumulator.pm25 += x.pm25;
                accumulator.pm10 += x.pm10;
                i++;
            } else {
                accumulator.timestamp /= shorteningRatio;
                accumulator.pm25 /= shorteningRatio;
                accumulator.pm10 /= shorteningRatio;
                i = 0;

                means.push({
                    pm25: accumulator.pm25,
                    pm10: accumulator.pm10,
                    date: new Date(accumulator.timestamp)
                });

                accumulator = { timestamp: 0, pm10: 0, pm25: 0 };
            }
        });

        return new Promise(resolve => resolve(means));
    },
    saveRecord: record => {
        return records.insertOne(record, err => err != null
            ?
            console.log(err)
            :
            console.log('Saved ' + JSON.stringify(record)));
    }
});

