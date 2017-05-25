package info.androidhive.floatingview.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by Philip on 24/5/17.
 */

public class User {
    @SerializedName("user_name")
    private String username;

    @SerializedName("user_id")
    private Long userId;

    @SerializedName("omnikey")
    private String omniKey;

    private String token;

    private String status;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOmniKey() {
        return omniKey;
    }

    public void setOmniKey(String omniKey) {
        this.omniKey = omniKey;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
