@Entity
public class SocialPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Topic cannot be empty") // Validation!
    private String topic;

    private String platform; // e.g., "LinkedIn"
    
    @Column(columnDefinition = "TEXT")
    private String generatedText;
    
    // Getters and Setters...
}