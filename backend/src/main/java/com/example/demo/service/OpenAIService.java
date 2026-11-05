@Service
public class OpenAIService {
    
    @Value("${openai.api.key}")
    private String apiKey;

    public String generatePost(String topic, String platform) {
        // Here you write the RestTemplate or WebClient code to call OpenAI.
        // You pass the apiKey in the HTTP Authorization header.
        // Return the generated text string.
        return "Generated AI text for " + platform + " about " + topic; 
    }
}