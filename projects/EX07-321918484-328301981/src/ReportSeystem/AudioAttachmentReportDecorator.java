package ReportSeystem;

public class AudioAttachmentReportDecorator extends ReportDecorator {
    public AudioAttachmentReportDecorator(Report report) {
        super(report);
    }

    @Override
    public String getContent() {
        return report.getContent() + " [AUDIO ATTACHED]";
    }

    @Override
    public String getType() {
        return report.getType();
    }
}
