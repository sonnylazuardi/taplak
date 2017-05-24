package info.androidhive.floatingview.model;

/**
 * Created by inagi on 5/24/17.
 */

public class APIAIResponse {

    private String id;
    private String timestamp;
    private APIAIResult result;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public APIAIResult getResult() {
        return result;
    }

    public void setResult(APIAIResult result) {
        this.result = result;
    }
}
