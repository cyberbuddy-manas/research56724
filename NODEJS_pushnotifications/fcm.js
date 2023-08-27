var FCM = require('fcm-node');
var serverKey = 'AAAAiB5Pr0A:APA91bGX-Zuflr-hrR3s7D-DwxkLqzntYt3Gf3-qrRz3DI1ab4tSXVg0fhajXGDdkTUOGlLaS-pYeUdaU-SssX74tZuqsdLMUitOE1_R0_76uujE2vKHjNBWsbZtZ-jbRMma07ELW8V_';
var fcm = new FCM(serverKey);

var message = {
    to: 'eDSMT5D8nectsOstgRLs3p:APA91bEVHVLCtAvdHrDqIgm737M_7SJVOkOvD9HX5a_Vh4PYRkJqbJsknuuuC1BEBz4mY3KQERPtFc3AkYT1G_X5nr5rZPVbx2raKa3BskrWSEYES_y4Co6ut3w5exGDOvjQF6k_Aw2q',
    // to: 'dwrNP96voG0yrqz8LeQxkG:APA91bG1c6lbgt-cKfFGJ3g2kPTIY4xlkmb29zy2NX8S7M48WiuvuQ_uXcTG6Dni-cwIwJvKJ5SOjdCfuBUS75xcl6Fgbqkkrfaxp7JR2azM1eOtaTrE3GEOaxRBFLvOII45R_R7b_JH',
    // to: 'fVnLh4y81sh0Q4DQDFYMs2:APA91bF-GwGQyDxfdzcu4syAGnCnjE-VSsqLS7t_5oIEY9tl6YZ0b6jG4yLFrzdTokBRTGRU2AqDMtZ4O7Nx1RaxILVfPKFse1xz0Xd910t6s-6cOWXZby6f-VRhcy1oC06nTOqFGJvt',
    // to: 'eJ9NXwHew6txu3-Q1zwUIh:APA91bF_4GSAHg0Aj_f1LFUQkHdIFuowL40bf4D_E03OwHHgkubwEt5KNJfJjU3B2SBkCkD9SNQDQeV1T95E9KngISm4P2xuFmv9y31inl5dUcSum18XrrEdtta60CC_rRNE_9_RVAab',
    notification: {
        title: '⚠️ ALERT ⚠️',
        body: 'Your recent body stats indicate potential problems. Click here to view reports.',
        // image: 'https://www.example.com/image.png'
    }
};

fcm.send(message, function (err, response) {
    if (err) {
        console.log("Something has gone wrong!" + err);
        console.log("Respponse:! " + response);
    } else {
        // showToast("Successfully sent with response");
        console.log("Successfully sent with response: ", response);
    }

});
