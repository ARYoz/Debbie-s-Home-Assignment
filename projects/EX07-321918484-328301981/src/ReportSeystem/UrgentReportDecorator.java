package ReportSeystem;

public class UrgentReportDecorator extends ReportDecorator {
    public UrgentReportDecorator(Report report) {
        super(report);
    }

    @Override
    public String getContent() {
        return "[URGENT] " + report.getContent();
    }

    @Override
    public String getType() {
        return report.getType();
    }
}
