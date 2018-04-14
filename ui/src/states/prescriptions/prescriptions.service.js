(function() {
    module.exports = function(app, angular) {
        app.factory('PrescriptionsService', ['$http', function($http) {

            var getPrescriptions = function() {
                return [{"npi":"1437329034","nppes_provider_last":"4 YOUR EYES, LLC","nppes_provider_state":"LA","nppes_provider_zip":"70123","opioid_claim_count":"0","opioid_prescribing":"0.00","specialty":"Ophthalmology","total_claim_count":"29"},
                {"npi":"1356411565","nppes_provider_first":"CASEY","nppes_provider_last":"AARON","nppes_provider_state":"LA","nppes_provider_zip":"71105","opioid_claim_count":"12","opioid_prescribing":"0.46","specialty":"Physician Assistant","total_claim_count":"2606"},
                {"npi":"1609028000","nppes_provider_first":"ZAINAB","nppes_provider_last":"ABBAS","nppes_provider_state":"LA","nppes_provider_zip":"71103","opioid_claim_count":"12","opioid_prescribing":"7.84","specialty":"Internal Medicine","total_claim_count":"153"},
                {"npi":"1750388740","nppes_provider_first":"RICHARD","nppes_provider_last":"ABBEN","nppes_provider_state":"LA","nppes_provider_zip":"70360","opioid_claim_count":"130","opioid_prescribing":"0.57","specialty":"Cardiology","total_claim_count":"22993"}];
                //$http.get('/api/prescriptions/');
            };

            return {
                getPrescriptions: getPrescriptions
            };
        }]);
    };
})();
