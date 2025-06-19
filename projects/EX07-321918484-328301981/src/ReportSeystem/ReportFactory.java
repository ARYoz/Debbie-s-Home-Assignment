package ReportSeystem;

import java.util.List;

public class ReportFactory {
    public static Report createBaseReport(String type, String content) {
        return switch (type) {
            case "1" -> new IncidentReport(content);
            case "2" -> new MovementReport(content);
            case "3" -> new ContactReport(content);
            case "4" -> new RoutineReport(content);
            default -> null;
        };
    }

    public static Report addDecorator(Report report, String code) {
        return switch (code) {
            case "u" -> new UrgentReportDecorator(report);
            case "c" -> new ClassifiedReportDecorator(report);
            case "t" -> new CommanderTagReportDecorator(report);
            case "a" -> new AudioAttachmentReportDecorator(report);
            default -> {
                System.out.println("Unknown decorator code: " + code);
                yield report;
            }
        };
    }
}
