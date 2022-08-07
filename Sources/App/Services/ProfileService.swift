//
// Created by Alyx Mote on 8/5/22.
//

import Vapor
import Fluent

struct ProfileService {
    let request: Request

    func fetchProfile(_ id: String) async throws -> ClientProfile {
        guard let profile = try await Profile.query(on: request.db)
            .filter(\.$id == id)
            .with(\.$account)
            .first() else {
            throw Abort(.notFound)
        }
        return ClientProfile(from: profile)
    }
}

extension Request {
    var profileService: ProfileService {
        .init(request: self)
    }
}
