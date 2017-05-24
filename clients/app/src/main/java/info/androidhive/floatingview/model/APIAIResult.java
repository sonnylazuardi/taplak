package info.androidhive.floatingview.model;

import java.util.Map;

/**
 * Created by inagi on 5/24/17.
 */

public class APIAIResult {

    private String source;
    private String resolvedQuery;
    private String action;
    private Map<String, Object> parameters;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getResolvedQuery() {
        return resolvedQuery;
    }

    public void setResolvedQuery(String resolvedQuery) {
        this.resolvedQuery = resolvedQuery;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Map<String, Object> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }
}
