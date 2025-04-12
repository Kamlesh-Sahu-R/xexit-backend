const axios = require("axios");
const config = require("../src/config/config");

let holidaysMap = {
    US: {},
};

const checkCalendar = async (req, res, next) => {

    let year = req.body.lwd.split("-")[0];

    if (!(holidaysMap["US"] && holidaysMap["US"][year])) {

        try {
            let { data: { response: { holidays } } } = await axios.get(
                `https://calendarific.com/api/v2/holidays?api_key=${config.calendrafic_api_key}&country=US&year=${year}`
            );

            holidaysMap["US"][year] = {};

            holidays
                .filter(({ type }) => type.includes("National holiday"))
                .forEach(({ date }) => (holidaysMap["US"][year][date.iso] = true));

            holidaysMap["US"][year] = Object.keys(holidaysMap["US"][year]);

        } catch (err) {
            console.log("holyday data fetch error");
            console.log(err);
            return res.status(500).json({
                error: "Problem with fetching holidays",
            });
        }
    }

    try {
        if (holidaysMap["US"][year]?.includes(req.body.lwd)) {
            return res.status(400).json({
                error: "LWD is on a holiday",
            });
        } else {
            next();
        }
    } catch (err) {
        return res.status(500).json({
            error: "Error while checking calendar",
        });
    }
};

module.exports = { checkCalendar };
