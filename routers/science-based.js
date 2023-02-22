// ฐานวิทย์

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});

const config = require("../configs/config.js");

const { google } = require("googleapis");



router.post('/api/science-based', urlEncoded, async (req, res) => {
    const {
        level,
        branch,
        student_image,
        prefix,
        student_name,
        student_lastname,
        birth,
        idcard,
        race,
        nationality,
        religion,
        house_number,
        group,
        village,
        street,
        alley,
        subdistrict,
        district,
        province,
        zip_code,
        phone_number,
        school,
        school_subdistrict,
        school_district,
        school_province,
        school_zip_code,
        GPA,
        school_type,
        graduated_level,
        father_name,
        father_lastname,
        father_job,
        father_phone_number,
        mother_name,
        mother_lastname,
        mother_phone_number,
        essay_image,
    } = await req.body ?? {};

    const auth = new google.auth.GoogleAuth({
        keyFile: "./keys/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = config.sheetsId.scienceBased;

    try {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "ชีต1!A:B",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [
                        level,
                        branch,
                        student_image,
                        prefix,
                        student_name,
                        student_lastname,
                        birth,
                        idcard,
                        race,
                        nationality,
                        religion,
                        house_number,
                        group,
                        village,
                        street,
                        alley,
                        subdistrict,
                        district,
                        province,
                        zip_code,
                        phone_number,
                        school,
                        school_subdistrict,
                        school_district,
                        school_province,
                        school_zip_code,
                        GPA,
                        school_type,
                        graduated_level,
                        father_name,
                        father_lastname,
                        father_job,
                        father_phone_number,
                        mother_name,
                        mother_lastname,
                        mother_phone_number,
                        essay_image,
                    ]
                ],
            },
        }); 

        res.json({
            status: "SUCCESS",
            error: null,
        });
    }
    catch (err) {
        return res.json({
            status: "FAIL",
            error: err,
        });
    }
});

module.exports = router;